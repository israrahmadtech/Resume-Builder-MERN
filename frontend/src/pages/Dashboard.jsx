import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const colors = ["#8e51ff", "#0f766e", "#dc2626", "#2563eb", "#ea580c"];

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreteResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();

      if (confirm) {
        const { data } = await api.put(
          "/api/resumes/update",
          { resumeId: editResumeId, resumeData: { title } },
          {
            headers: { Authorization: token },
          }
        );
        setAllResumes(
          allResumes.map((resume) =>
            resume._id === editResumeId ? { ...resume, title } : resume
          )
        );
        loadAllResumes();
        setTitle("");
        setEditResumeId("");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume"
      );

      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-[#8e51ff]">Workspace</p>
            <h1 className="text-3xl font-semibold text-slate-950">
              Welcome back, {user?.name || "Creator"}
            </h1>
            <p className="text-slate-500 mt-1">
              Create, upload, edit, and publish professional resumes from one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <FileText className="size-5 text-[#8e51ff]" />
            <div>
              <p className="text-xl font-semibold text-slate-900">{allResumes.length}</p>
              <p className="text-xs text-slate-500">Saved resumes</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setShowCreteResume(true)}
            className="w-full h-44 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-[#8e51ff]/40 bg-white group hover:border-[#8e51ff] hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-[#8e51ff] text-white rounded-lg" />
            <p className="mt-3 text-sm font-medium group-hover:text-[#8e51ff] transition-all">
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full h-44 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 bg-white group hover:border-slate-950 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-slate-950 text-white rounded-lg" />
            <p className="mt-3 text-sm font-medium group-hover:text-slate-950 transition-all">
              Upload Existing
            </p>
          </button>

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full h-44 flex flex-col items-start justify-between rounded-lg gap-2 border group hover:shadow-md transition-all duration-300 cursor-pointer p-4 text-left bg-white"
                style={{
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-10 p-2 rounded-lg group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-base font-semibold text-slate-900 break-words"
                >
                  {resume.title}
                </p>

                <p
                  className="text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300"
                  style={{
                    color: baseColor + "90",
                  }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 group-hover:flex items-center hidden">
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreteResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreteResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full py-2 mb-4 px-4 focus:border-[#8e51ff] focus:ring-[#8e51ff]"
                required
              />

              <button className="w-full py-2 bg-[#8e51ff] text-white rounded-lg hover:bg-[#7a3df0] transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreteResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full py-2 mb-4 px-4 focus:border-[#8e51ff] focus:ring-[#8e51ff]"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file
                  <div
                    className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-[#8e51ff] hover:text-[#8e51ff] cursor-pointer transition-colors
                  "
                  >
                    {resume ? (
                      <p className="text-[#8e51ff]">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                disabled={isLoading}
                className="w-full py-2 bg-[#8e51ff] text-white rounded-lg hover:bg-[#7a3df0] transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full py-2 mb-4 px-4 focus:border-[#8e51ff] focus:ring-[#8e51ff]"
                required
              />

              <button className="w-full py-2 bg-[#8e51ff] text-white rounded-lg hover:bg-[#7a3df0] transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
