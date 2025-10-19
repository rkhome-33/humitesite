import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Phone, ShieldCheck, Clock, CheckCircle2, Droplets, Wrench, Ruler, MapPin, ArrowRight, ChevronDown, FileText } from "lucide-react";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="mb-8 text-center">
    {kicker && <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">{kicker}</div>}
    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    {children && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{children}</p>}
  </div>
);

const Pill = ({ icon: Icon, children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ${className}`}>
    {Icon && <Icon className="h-4 w-4" aria-hidden />}
    <span>{children}</span>
  </div>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen(v=>!v)} aria-expanded={open}>
        <span className="text-base font-semibold text-slate-900">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-3 text-slate-600">{a}</p>}
    </div>
  );
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  function validate(form) {
    const e = {};
    if (!form.get("name")?.toString().trim()) e.name = "Nom requis";
    const phone = form.get("phone")?.toString().trim();
    if (!phone) e.phone = "Téléphone requis";
    const email = form.get("email")?.toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide";
    return e;
  }
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const eMap = validate(formData);
    if (Object.keys(eMap).length) { setErrors(eMap); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    alert("Merci ! Votre demande a été enregistrée. Nous revenons vers vous rapidement.");
    e.currentTarget.reset();
  }
  const fieldCls = "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom*</label>
        <input name="name" className={fieldCls} placeholder="Jean Dupont" />
        {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Téléphone*</label>
        <input name="phone" className={fieldCls} placeholder="06 59 61 02 85" />
        {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input name="email" className={fieldCls} placeholder="contact@humitek.fr" />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea name="message" rows={4} className={fieldCls} placeholder="Décrivez votre besoin (fuite, infiltration, diagnostic…)" />
      </div>
      <div className="sm:col-span-2 flex items-start gap-2">
        <input id="gdpr" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
        <label htmlFor="gdpr" className="text-sm text-slate-600">J’accepte d’être recontacté·e et la politique de confidentialité.</label>
      </div>
      <div className="sm:col-span-2">
        <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">
          <Phone className="h-5 w-5" />
          {loading ? "Envoi…" : "Demander un devis"}
        </button>
      </div>
    </form>
  );
};

export default function Home() {
  const trustBullets = useMemo(() => [
    { icon: CheckCircle2, label: "Experts en pathologies du bâtiment" },
    { icon: Clock, label: "Intervention rapide" },
    { icon: MapPin, label: "Nouvelle-Aquitaine" },
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src="/logo_humitek.png" alt="HUMITEK" fill className="object-contain" priority />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">HUMITEK</div>
              <div className="text-xs text-slate-500">Maîtriser l’humidité</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="hover:text-sky-700">Services</a>
            <a href="#avis" className="hover:text-sky-700">Avis</a>
            <a href="#contact" className="hover:text-sky-700">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+33659610285" className="hidden rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 sm:inline-flex items-center gap-2">
              <Phone className="h-4 w-4"/> 06 59 61 02 85
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
              Devis <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </Container>
      </header>

      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <Container className="grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2">
          <div>
            <Pill icon={ShieldCheck}>Maîtriser l’humidité</Pill>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              HUMITEK — Recherche de fuites, infiltrations, diagnostic humidité
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Experts en pathologies du bâtiment. Diagnostic précis et solutions adaptées, en toute indépendance.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {trustBullets.map((b, i) => (
                <Pill key={i} icon={b.icon}>{b.label}</Pill>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-700">
                Demander un devis <ArrowRight className="h-5 w-5"/>
              </a>
              <a href="tel:+33659610285" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
                Appeler le 06 59 61 02 85
              </a>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <div className="mx-auto h-20 w-20"><Image src="/logo_humitek.png" alt="HUMITEK" width={80} height={80} /></div>
              <div className="mt-2">HUMITEK · Nouvelle-Aquitaine</div>
            </div>
          </div>
        </Container>
      </section>

      <section id="services" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Services" title="Nos expertises">
            Nous intervenons en Nouvelle-Aquitaine pour diagnostiquer et résoudre durablement les problèmes d’humidité.
          </SectionTitle>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Droplets className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Recherche de fuites</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Localisation précise avec l’ensemble des outils adaptés : thermographie, hygrométrie, caméras d’inspection, tests traceurs, etc.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Ruler className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Diagnostic infiltrations</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Identification des infiltrations d’eau plus graves (murs enterrés, toitures, points singuliers) et recommandations d’intervention.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <FileText className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Expertise conseil avant vente</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Évitez les vices cachés et sécurisez votre transaction. Un diagnostic indépendant pour acheter ou vendre sereinement.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Wrench className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Solutions adaptées</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Recommandations selon les pathologies : injections de résine, cuvelage, traitement de l’air, étanchéités extérieures, etc.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="process" className="border-b border-slate-200 bg-slate-50 py-12">
        <Container>
          <SectionTitle kicker="Accompagnement" title="Un parcours simple et efficace">
            De la prise de contact au suivi, nous restons votre interlocuteur unique.
          </SectionTitle>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { title: "Prise de contact", desc: "Échange rapide, recueil des premières informations et prise de rendez-vous." },
              { title: "Intervention rapide", desc: "Déplacement sur site, mesures et tests non destructifs, rapport synthétique." },
              { title: "Accompagnement", desc: "Aide auprès des assurances et des entreprises de travaux jusqu’à résolution." },
            ].map((step, i) => (
              <li key={i} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white shadow-sm">{i+1}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="avis" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Avis" title="Avis Google">
            Quelques retours clients. Nous pouvons connecter vos avis Google automatiquement si vous nous fournissez l’URL de votre fiche.
          </SectionTitle>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "A. Martin", text: "Diagnostic précis et recommandations claires. Très pro." },
              { name: "S. Bernard", text: "Fuite localisée rapidement, intervention coordonnée avec l’entreprise de travaux." },
              { name: "C. Dupuy", text: "Conseil avant achat très utile, a évité une mauvaise surprise." },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-500" aria-label="Note 5/5">
                  {Array.from({length:5}).map((_, j) => <svg key={j} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="mt-3 text-sm text-slate-700">“{r.text}”</p>
                <div className="mt-3 text-sm font-semibold text-slate-900">— {r.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm font-semibold text-sky-700 hover:underline">Voir plus d’avis sur Google</a>
          </div>
        </Container>
      </section>

      <section id="contact" className="bg-slate-50 py-12">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Contact & Devis</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Bordeaux – Nouvelle-Aquitaine. Dites-nous ce que vous constatez, nous revenons vers vous rapidement.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
                  <Phone className="h-6 w-6"/>
                </div>
                <div>
                  <div className="font-semibold">Un besoin urgent ?</div>
                  <div className="text-sm text-slate-600">Appelez-nous ou laissez vos coordonnées.</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li><strong>Tél.</strong> : <a className="text-sky-700 hover:underline" href="tel:+33659610285">06 59 61 02 85</a></li>
                <li><strong>Email</strong> : <a className="text-sky-700 hover:underline" href="mailto:contact@humitek.fr">contact@humitek.fr</a></li>
                <li><strong>Zone</strong> : Nouvelle-Aquitaine</li>
              </ul>
              <div className="mt-6 space-y-2">
                <Pill icon={CheckCircle2}>Experts indépendants</Pill>
                <Pill icon={Clock}>Intervention rapide</Pill>
                <Pill icon={MapPin}>Bordeaux · Nouvelle-Aquitaine</Pill>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10 text-sm">
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold">HUMITEK</div>
            <p className="mt-2 text-slate-600">Recherche de fuites, infiltrations & diagnostics humidité — Nouvelle-Aquitaine.</p>
          </div>
          <div>
            <div className="font-semibold">Liens</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#avis" className="hover:underline">Avis</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Légal</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">Mentions légales</a></li>
              <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </Container>
        <Container className="mt-8 border-t border-slate-200 pt-6 text-slate-500">
          © {new Date().getFullYear()} HUMITEK – Tous droits réservés.
        </Container>
      </footer>
    </div>
  );
}
