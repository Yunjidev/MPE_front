import { useState, useEffect, useMemo } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData, putData, deleteData, getData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import Input from "../../components/Utils/Inputs/Input";

const CreateJobForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // état local pour le visuel + upload
  const [state, setState] = useState({ photo: null, loading: false });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getData("jobs");
        setJobs(response || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des métiers:", error);
      }
    };
    fetchJobs();
  }, []);

  const isFile = (v) => v instanceof File;

  const handlePhotoChange = (file) => {
    setState((prev) => ({ ...prev, photo: file || null }));
  };

  const handleDeletePhoto = () => {
    setState((prev) => ({ ...prev, photo: null }));
  };

  const onSubmitJob = async (data) => {
    try {
      setState((p) => ({ ...p, loading: true }));

      const fd = new FormData();
      fd.append("name", data.jobTitle?.trim() || "");

      // n'ajoute picture que si on a un fichier (pas une URL)
      if (isFile(state.photo)) {
        fd.append("picture", state.photo);
      }

      const jobResponse = await postData("admin/job", fd);

      if (jobResponse) {
        toast.success("Métier créé avec succès !");
        reset();
        setState({ photo: null, loading: false });
        setJobs((prev) => [...prev, jobResponse]);
        setSelectedJob(null);
      } else {
        toast.error("Erreur lors de la création du métier.");
        setState((p) => ({ ...p, loading: false }));
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création du métier.");
      setState((p) => ({ ...p, loading: false }));
    }
  };

  const onUpdateJob = async (data) => {
    if (!selectedJob) return;

    try {
      setState((p) => ({ ...p, loading: true }));

      const fd = new FormData();
      fd.append("name", data.jobTitle?.trim() || "");

      // Si fichier choisi => on l’envoie
      if (isFile(state.photo)) {
        fd.append("picture", state.photo);
      }
      // Sinon, si tu veux forcer la suppression quand l’utilisateur clique “X” :
      // if (!state.photo) {
      //   fd.append("removePicture", "true");
      // }

      const jobResponse = await putData(`admin/job/${selectedJob.id}`, fd);

      if (jobResponse) {
        toast.success("Métier modifié avec succès !");
        reset();
        setJobs((prev) => prev.map((job) => (job.id === selectedJob.id ? jobResponse : job)));
        setSelectedJob(null);
        setState({ photo: null, loading: false });
      } else {
        toast.error("Erreur lors de la modification du métier.");
        setState((p) => ({ ...p, loading: false }));
      }
    } catch (error) {
      console.error("Erreur lors de la modification du métier:", error);
      toast.error("Erreur lors de la modification du métier.");
      setState((p) => ({ ...p, loading: false }));
    }
  };

  const onDeleteJob = async () => {
    if (!selectedJob) return;
    if (!confirm(`Supprimer le métier “${selectedJob.name}” ?`)) return;

    try {
      setState((p) => ({ ...p, loading: true }));
      const res = await deleteData(`admin/job/${selectedJob.id}`);

      if (res && (res.message?.includes("supprim") || res.success)) {
        toast.success("Métier supprimé avec succès !");
        reset();
        setJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
        setSelectedJob(null);
        setState({ photo: null, loading: false });
      } else {
        toast.error("Erreur lors de la suppression du métier.");
        setState((p) => ({ ...p, loading: false }));
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression du métier.");
      setState((p) => ({ ...p, loading: false }));
    }
  };

  const handleJobSelect = (event) => {
    const name = event.target.value;
    const found = jobs.find((j) => j.name === name);
    if (found) {
      setSelectedJob(found);
      setValue("jobTitle", found.name);
      // si on a une URL image, on la pose (l’upload n’enverra pas l’URL, seulement un fichier si l’utilisateur en remet un)
      setState((prev) => ({ ...prev, photo: found.picture || null }));
    } else {
      setSelectedJob(null);
      setState((prev) => ({ ...prev, photo: null }));
      reset();
    }
  };

  // Aperçu image : si File -> URL.createObjectURL, sinon on affiche la string (url)
  const previewUrl = useMemo(() => {
    if (isFile(state.photo)) return URL.createObjectURL(state.photo);
    if (typeof state.photo === "string") return state.photo;
    return "";
  }, [state.photo]);

  const primaryBtn =
    "inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white active:scale-[0.98] transition-all";
  const dangerBtn =
    "inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-red-600/50 text-red-300 hover:bg-red-600/10 hover:text-red-200 active:scale-[0.98] transition-all";
  const inputCls =
    "w-full h-12 rounded-xl bg-neutral-900/80 text-white placeholder:text-neutral-500 border border-neutral-800 outline-none ring-0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition";
  const labelCls = "text-sm text-neutral-300";

  return (
    <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/60 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] p-5 lg:p-6 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700">
            <FaBriefcase className="text-neutral-300" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-white">Gestion des métiers</h2>
            <p className="text-xs text-neutral-400">Créer, modifier ou supprimer un métier.</p>
          </div>
        </div>
      </div>

      {/* Select métier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6">
          <label htmlFor="jobSelect" className={labelCls}>
            Sélectionner un métier
          </label>
          <select
            id="jobSelect"
            onChange={handleJobSelect}
            className={`${inputCls} mt-4 pr-10`}
            defaultValue=""
          >
            <option value="" disabled>
              Choisir dans la liste…
            </option>
            {jobs.map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
          </select>
        </div>

        {/* État sélectionné */}
        <div className="lg:col-span-6 flex items-end">
          {selectedJob ? (
            <div className="w-full h-12 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 grid place-items-center text-sm">
              Métier sélectionné : <strong className="ml-1">{selectedJob.name}</strong>
            </div>
          ) : (
            <div className="w-full h-12 rounded-xl border border-neutral-800 bg-neutral-900/70 text-neutral-400 grid place-items-center text-sm">
              Aucun métier sélectionné
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 border-neutral-800" />

      {/* Form */}
      <form
        onSubmit={handleSubmit(selectedJob ? onUpdateJob : onSubmitJob)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        {/* Titre du métier */}
        <div className="lg:col-span-6">
          <label htmlFor="jobTitle" className={labelCls}>
            Titre du métier
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              <FaBriefcase />
            </span>
            <input
              id="jobTitle"
              type="text"
              {...register("jobTitle", { required: true })}
              placeholder="Ex : Coiffeur, Mécanicien, Plombier…"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        {/* Upload / Preview */}
        <div className="lg:col-span-6">
          <label className={labelCls}>Illustration</label>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-800 rounded-xl bg-neutral-900/70 p-3">
              <Input.SingleUpload
                placeholder="Sélectionnez une image"
                onFileUpload={handlePhotoChange}
                onFileDelete={handleDeletePhoto}
                url={state.photo}
                isEditMode={!!selectedJob}
              />
            </div>

            <div className="border border-neutral-800 rounded-xl bg-neutral-900/70 p-3 flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Aperçu"
                  className="w-full h-40 object-cover rounded-lg border border-neutral-800"
                />
              ) : (
                <div className="w-full h-40 grid place-items-center text-neutral-500 text-sm">
                  Aucun aperçu disponible
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-12 flex flex-wrap gap-3 justify-center pt-2">
          <button
            className={`${primaryBtn} min-w-[220px]`}
            type="submit"
            disabled={state.loading}
          >
            {state.loading
              ? "Veuillez patienter…"
              : selectedJob
              ? "Modifier le métier"
              : "Créer le métier"}
          </button>

          {selectedJob && (
            <button
              type="button"
              onClick={onDeleteJob}
              className={`${dangerBtn} min-w-[220px]`}
              disabled={state.loading}
            >
              Supprimer le métier
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
