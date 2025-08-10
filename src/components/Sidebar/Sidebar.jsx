/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { enterprisesAtom } from "../../store/enterprises";
import UserSideBar from "./UserSideBar";
import EnterpriseSideBar from "./EnterpriseSideBar";
import AdminSideBar from "./AdminSideBar";
import HamburgerIcon from "../Utils/Svg/HamburgerIcon";

const linkstyle =
  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800/80 transition";
const iconstyle = "w-5 h-5 text-neutral-200";
const userColorStyle =
  "bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text";
const enterpriseColorStyle =
  "bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text";
const adminColorStyle =
  "bg-gradient-to-r from-white to-emerald-300 text-transparent bg-clip-text";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const [enterprisesRaw] = useAtom(enterprisesAtom);

  // Fermer au clic en dehors (mobile)
  useEffect(() => {
    const onDown = (e) => {
      if (window.innerWidth >= 1024) return;
      const aside = document.getElementById("sidebar");
      if (isOpen && aside && !aside.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen]);

  // Détecter s'il y a au moins 1 entreprise dans la source (array ou {data}/{results})
  const hasAnyEnterprise = useMemo(() => {
    if (Array.isArray(enterprisesRaw)) return enterprisesRaw.length > 0;
    if (Array.isArray(enterprisesRaw?.data)) return enterprisesRaw.data.length > 0;
    if (Array.isArray(enterprisesRaw?.results)) return enterprisesRaw.results.length > 0;
    return false;
  }, [enterprisesRaw]);

  // Afficher la section Entreprise si flag backend OU présence locale d'au moins 1 entreprise
  const showEnterpriseSection = (user?.isEntrepreneur === true) || hasAnyEnterprise;

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        type="button"
        className="fixed top-24 left-6 z-40 lg:hidden inline-flex items-center p-2 rounded-lg ring-1 ring-neutral-700 bg-neutral-900/80 text-neutral-200 hover:bg-neutral-800 active:scale-95 transition"
        onClick={() => setIsOpen((s) => !s)}
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        <span className="sr-only">Ouvrir la navigation</span>
        <HamburgerIcon />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed lg:sticky z-40 top-24 left-0 lg:left-2 w-[280px] lg:w-[300px]
        h-[calc(100vh-6rem)] px-2 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="p-3 space-y-6 overflow-auto h-full">
            <section>
              <div className="px-2 text-[10px] uppercase tracking-wide text-neutral-500 mb-2">
                Utilisateur
              </div>
              <UserSideBar
                user={user}
                colorStyle={userColorStyle}
                iconstyle={iconstyle}
                linkstyle={linkstyle}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
              />
            </section>

            {showEnterpriseSection && (
              <section>
                <div className="px-2 text-[10px] uppercase tracking-wide text-neutral-500 mb-2">
                  Entreprise
                </div>
                <EnterpriseSideBar
                  // Passe ta source brute : la liste affichera aussi la nouvelle "pending"
                  enterprises={enterprisesRaw}
                  colorStyle={enterpriseColorStyle}
                  // Ton composant d'origine utilisait "iconStyle" (majuscule S)
                  iconStyle={iconstyle}
                  linkstyle={linkstyle}
                  onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                />
              </section>
            )}

            {user?.isAdmin && (
              <section>
                <div className="px-2 text-[10px] uppercase tracking-wide text-neutral-500 mb-2">
                  Administration
                </div>
                <AdminSideBar
                  user={user}
                  colorStyle={adminColorStyle}
                  iconstyle={iconstyle}
                  linkstyle={linkstyle}
                  onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                />
              </section>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
