const sanitizeFileName = (value = "resume") =>
  value
    .trim()
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase() || "resume";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year || !month) return dateStr;
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const downloadResumePdf = (resumeData) => {
  const previousTitle = document.title;
  document.title = sanitizeFileName(
    resumeData.title || resumeData.personal_info?.full_name
  );
  window.print();
  setTimeout(() => {
    document.title = previousTitle;
  }, 500);
};

export const downloadResumeDocx = async (resumeData) => {
  const [
    {
      AlignmentType,
      BorderStyle,
      Document,
      HeadingLevel,
      Packer,
      Paragraph,
      TextRun,
    },
    { saveAs },
  ] = await Promise.all([import("docx"), import("file-saver")]);

  const text = (value = "", options = {}) =>
    new TextRun({
      text: String(value),
      font: "Aptos",
      size: 22,
      ...options,
    });

  const paragraph = (children, options = {}) =>
    new Paragraph({
      children: Array.isArray(children) ? children : [text(children)],
      spacing: { after: 120 },
      ...options,
    });

  const sectionHeading = (title) =>
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: "8e51ff",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    });

  const bullet = (value) =>
    new Paragraph({
      children: [text(value)],
      bullet: { level: 0 },
      spacing: { after: 80 },
    });

  const addSection = (children, title, content) => {
    if (!title || !content || content.length === 0) return;
    children.push(sectionHeading(title), ...content);
  };

  const personalInfo = resumeData.personal_info || {};
  const fullName = personalInfo.full_name || "Your Name";
  const children = [
    new Paragraph({
      children: [text(fullName, { bold: true, size: 42, color: "111827" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
  ];

  if (personalInfo.profession) {
    children.push(
      new Paragraph({
        children: [text(personalInfo.profession, { size: 24, color: "8e51ff" })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      })
    );
  }

  const contact = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.website,
  ].filter(Boolean);

  if (contact.length > 0) {
    children.push(
      new Paragraph({
        children: [text(contact.join(" | "), { size: 19, color: "475569" })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 220 },
      })
    );
  }

  addSection(
    children,
    "Professional Summary",
    resumeData.professional_summary
      ? [paragraph(resumeData.professional_summary)]
      : []
  );

  addSection(
    children,
    "Experience",
    (resumeData.experience || []).flatMap((item) => [
      paragraph([
        text(item.position || "Position", { bold: true }),
        text(item.company ? ` - ${item.company}` : "", { color: "8e51ff" }),
      ]),
      paragraph(
        `${formatDate(item.start_date)} - ${
          item.is_current ? "Present" : formatDate(item.end_date)
        }`,
        { spacing: { after: 80 } }
      ),
      ...(item.description || "")
        .split("\n")
        .filter(Boolean)
        .map((line) => bullet(line)),
    ])
  );

  addSection(
    children,
    "Projects",
    (resumeData.project || [])
      .flatMap((item) => [
        paragraph([
          text(item.name || "Project", { bold: true }),
          text(item.type ? ` - ${item.type}` : "", { color: "64748b" }),
        ]),
        item.link ? paragraph(item.link) : null,
        item.description ? paragraph(item.description) : null,
      ])
      .filter(Boolean)
  );

  addSection(
    children,
    "Education",
    (resumeData.education || []).map((item) =>
      paragraph([
        text(`${item.degree || ""}${item.field ? ` in ${item.field}` : ""}`, {
          bold: true,
        }),
        text(item.institution ? ` - ${item.institution}` : "", {
          color: "8e51ff",
        }),
        text(
          item.graduation_date ? ` (${formatDate(item.graduation_date)})` : ""
        ),
        text(item.gpa ? ` GPA: ${item.gpa}` : ""),
      ])
    )
  );

  addSection(
    children,
    "Skills",
    (resumeData.skills || []).length > 0
      ? [paragraph((resumeData.skills || []).join(", "))]
      : []
  );

  addSection(
    children,
    "Certifications",
    (resumeData.certification || []).map((item) =>
      paragraph([
        text(item.certificate_name || "Certification", { bold: true }),
        text(item.issuer ? ` - ${item.issuer}` : "", { color: "8e51ff" }),
        text(item.issue_date ? ` (${formatDate(item.issue_date)})` : ""),
        text(item.description ? `: ${item.description}` : ""),
      ])
    )
  );

  (resumeData.additional_sections || []).forEach((section) => {
    addSection(
      children,
      section.title,
      (section.items || [])
        .filter((item) => item.label || item.description || item.date)
        .map((item) =>
          paragraph([
            text(item.label || "", { bold: Boolean(item.label) }),
            text(item.date ? ` - ${item.date}` : "", { color: "64748b" }),
            text(item.description ? `: ${item.description}` : ""),
          ])
        )
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${sanitizeFileName(resumeData.title || fullName)}.docx`;
  saveAs(blob, fileName);
};
