/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { getData } from "../../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";

function pickEnterpriseId(like) {
  // gère beaucoup de variations de schéma
  return (
    like?.enterprise_id ??
    like?.Enterprise_id ??
    like?.entreprise_id ??
    like?.enterpriseId ??
    like?.EnterpriseId ??
    like?.entrepriseId ??
    like?.enterprise?.id ??
    like?.Enterprise?.id ??
    like?.entreprise?.id ??
    null
  );
}

export default function Likes({ enterpriseId: enterpriseIdProp }) {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  // évite de retester un endpoint 404 en boucle
  const triedEnterpriseLikes404 = useRef(false);

  const enterpriseId = useMemo(() => {
    if (enterpriseIdProp != null) return String(enterpriseIdProp);
    const idFromUser = user?.enterprise?.id ?? user?.currentEnterpriseId ?? null;
    return idFromUser != null ? String(idFromUser) : null;
  }, [enterpriseIdProp, user]);

  useEffect(() => {
    let alive = true;

    async function fetchLikes() {
      setError(null);
      setCount(null);

      if (!enterpriseId) {
        if (alive) setCount(0);
        return;
      }

      // 1) tente l’endpoint “entreprise” une seule fois par session
if (!triedEnterpriseLikes404.current) {
  try {
    const res = await getData(`enterprise/${enterpriseId}/likes`); // <-- SINGULIER
    const arr = Array.isArray(res) ? res : [];
    if (!alive) return;
    setCount(arr.length);
    return; // on a fini
  } catch (e) {
    // si 404 → on n’essaie plus ce endpoint
    const msg = String(e?.message || "");
    if (msg.includes("404")) triedEnterpriseLikes404.current = true;
    // continue vers plan B
  }
}

      try {
        // 2) tente un filtre côté API si accepté par ton back Node
        // (beaucoup d’API acceptent un query param)
        try {
          const filtered = await getData(`likes?enterprise_id=${enterpriseId}`);
          if (Array.isArray(filtered)) {
            if (!alive) return;
            setCount(filtered.length);
            return;
          }
          // si ce n’est pas un array on tombera en plan C
        } catch {
          // ignore, on enchaîne
        }

        // 3) plan C: récupère les likes "flat" (probablement ceux de l'utilisateur)
        // et filtre côté front par enterprise
        const all = await getData(`likes`);
        const arr = Array.isArray(all) ? all : [];
        const onlyThisEnterprise = arr.filter(
          (l) => String(pickEnterpriseId(l)) === enterpriseId
        );

        if (!alive) return;
        setCount(onlyThisEnterprise.length);
      } catch (e) {
        if (!alive) return;
        setCount(0);
        setError("Impossible de récupérer les favoris.");
        // aide au debug sans polluer l’UI
        // eslint-disable-next-line no-console
        console.warn("[Likes] erreur:", e);
      }
    }

    fetchLikes();
    return () => { alive = false; };
  }, [enterpriseId]);

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border border-neutral-800
        bg-neutral-900/80 backdrop-blur-sm
        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
        p-5 min-w-[14rem] h-32 flex items-center gap-4
      "
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-pink-500/5 blur-2xl" />
      </div>

      <div className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-pink-400/30 bg-pink-500/10 text-pink-300">
        <FaHeart className="text-2xl" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-neutral-400">Favoris</div>

        {error ? (
          <div className="text-sm text-red-300 mt-1">{error}</div>
        ) : count === null ? (
          <div className="mt-1 h-6 w-16 rounded bg-neutral-800 animate-pulse" />
        ) : (
          <div className="mt-1">
            <span className="text-2xl font-semibold bg-gradient-to-r from-pink-200 to-pink-400 text-transparent bg-clip-text">
              {count}
            </span>
            <span className="ml-2 text-sm text-neutral-400">ajouts aux favoris</span>
          </div>
        )}

        <div className="text-[11px] text-neutral-500 mt-1">
          Total de likes reçus par l’entreprise
        </div>
      </div>
    </div>
  );
}
