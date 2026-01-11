import React, { useState } from 'react';
import { Play, BookOpen, ExternalLink, Battery, Moon, Coffee, Brain, Clock, Pill, GraduationCap } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Recursos() {
    const [activeTab, setActiveTab] = useState('all');

    const resources = [
        // --- ENERGIA ---
        {
            id: 1,
            title: "Tipología circadiana y salud mental",
            category: "energia",
            type: "article",
            icon: Battery,
            desc: "Estudi sobre la relació entre els ritmes circadians i la salut mental (SciELO).",
            readTime: "Estudi",
            url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-97282014000300021"
        },
        {
            id: 101,
            title: "Glucosa, Fructosa y Metabolismo",
            category: "energia",
            type: "article",
            icon: BookOpen,
            desc: "Nou estudi sobre l'impacte del sucre en el metabolisme i la salut cardiovascular (CIBER-ISCIII).",
            readTime: "Article",
            url: "https://www.ciberisciii.es/noticias/glucosa-o-fructosa-nuevo-estudio-sobre-el-impacto-del-azucar-en-el-metabolismo-y-la-salud-cardiovascular"
        },
        {
            id: 102,
            title: "Trastornos Mitocondriales",
            category: "energia",
            type: "article",
            icon: ExternalLink,
            desc: "Informació oficial sobre malalties i disfuncions mitocondrials (MedlinePlus).",
            readTime: "Guia",
            url: "https://medlineplus.gov/spanish/mitochondrialdiseases.html"
        },

        // --- SON ---
        {
            id: 4,
            title: "Higiene del sueño: revisión",
            category: "son",
            type: "article",
            icon: Moon,
            desc: "Revisió sobre coneixements i hàbits d'higiene del son en estudiants (SciELO).",
            readTime: "Revisió",
            url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1699-695X2017000300170"
        },
        {
            id: 201,
            title: "Ritmos circadianos y rendimiento",
            category: "son",
            type: "article",
            icon: BookOpen,
            desc: "Estudi sobre l'impacte dels ritmes de son en el rendiment acadèmic (SciELO).",
            readTime: "Estudi",
            url: "http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1692-72732006000200016"
        },
        {
            id: 202,
            title: "Yoga Nidra: Cambios Cerebrales",
            category: "son",
            type: "article",
            icon: ExternalLink,
            desc: "Primer estudi d'imatge cerebral sobre la connectivitat funcional durant el Yoga Nidra (IIT Delhi).",
            readTime: "Estudi",
            url: "https://home.iitd.ac.in/show.php?id=237&in_sections=Press"
        },

        // --- NUTRICIÓ ---
        {
            id: 3,
            title: "Ayuno intermitente: escenarios clínicos",
            category: "nutricio",
            type: "article",
            icon: Coffee,
            desc: "Efectes del dejuni intermitent en diversos escenaris clínics (SciELO).",
            readTime: "Revisió",
            url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-16112024000100026"
        },
        {
            id: 301,
            title: "Ayuno intermitente y metabolismo",
            category: "nutricio",
            type: "article",
            icon: BookOpen,
            desc: "El dejuni intermitent i els seus efectes metabòlics en adults (Dialnet).",
            readTime: "Paper",
            url: "https://dialnet.unirioja.es/descarga/articulo/9149710.pdf"
        },
        {
            id: 302,
            title: "Ayuno intermitente en la mujer",
            category: "nutricio",
            type: "article",
            icon: Coffee,
            desc: "Efectes cardiometabòlics del dejuni intermitent en dones (SciELO).",
            readTime: "Estudi",
            url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-16112023000700008"
        },

        // --- ATENCIÓ ---
        {
            id: 2,
            title: "Potenciar la atención y concentración",
            category: "atencio",
            type: "article",
            icon: Brain,
            desc: "Com millorar l'atenció i la concentració en l'estudi (Formación Ninja).",
            readTime: "Guia",
            url: "https://formacion.ninja/blog/atencion-concentracion-estudio"
        },
        {
            id: 401,
            title: "Neurociencia de la concentración",
            category: "atencio",
            type: "article",
            icon: BookOpen,
            desc: "7 formes eficaces de recolzar la concentració segons la neurociència (CogniFit).",
            readTime: "Article",
            url: "https://blog.cognifit.com/es/7-formas-eficaces-de-apoyar-la-concentracion-segun-la-neurociencia/"
        },
        {
            id: 402,
            title: "La Capacidad de Mantener la Atención",
            category: "atencio",
            type: "article",
            icon: Brain,
            desc: "Psicologia positiva aplicada a la capacitat de mantenir l'atenció (IEPP).",
            readTime: "Article",
            url: "https://www.iepp.es/concentracion/"
        },

        // --- TEMPS / LONGEVITAT ---
        {
            id: 5,
            title: "Vivir más y mejor: Longevidad",
            category: "temps",
            type: "article",
            icon: Clock,
            desc: "Què diu la ciència sobre la longevitat? (Clínic Barcelona).",
            readTime: "Article",
            url: "https://www.clinicbarcelona.org/noticias/vivir-mas-y-mejor-que-dice-la-ciencia-sobre-la-longevidad"
        },
        {
            id: 501,
            title: "Estilo de vida y envejecimiento",
            category: "temps",
            type: "article",
            icon: BookOpen,
            desc: "El 70% de l'envelliment depèn de l'estil de vida, segons experts (Infobae).",
            readTime: "Article",
            url: "https://www.infobae.com/generacion-silver/2025/10/17/el-70-del-envejecimiento-depende-del-estilo-de-vida-advierte-una-experta-en-longevidad/"
        },
        {
            id: 502,
            title: "Biomarcadores epigenéticos",
            category: "temps",
            type: "article",
            icon: BookOpen,
            desc: "Predicció de l'envelliment i risc de malalties (gTt-VIH).",
            readTime: "Article",
            url: "https://www.gtt-vih.org/publicaciones/la-noticia-del-dia/31-10-25/"
        },

        // --- SUPLEMENTS ---
        {
            id: 601,
            title: "Magnesio y salud cardiovascular",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "Revisió sistemàtica sobre nivells de magnesi i malaltia cardiovascular (REC).",
            readTime: "Revisió",
            url: "https://www.reccardioclinics.org/es-niveles-magnesio-enfermedad-cardiovascular-revision-articulo-S2605153220300856"
        },
        {
            id: 602,
            title: "Creatina y rendimiento cognitivo",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "La creatina millora el rendiment i redueix la fatiga per falta de son (ICNS).",
            readTime: "Article",
            url: "https://www.icns.es/noticia_la_creatina_mejora_rendimiento_cognitivo_fatiga_privacion_sueno"
        },
        {
            id: 603,
            title: "Riesgos y beneficios del NMN",
            category: "suplements",
            type: "article",
            icon: BookOpen,
            desc: "Anàlisi basada en evidència sobre el potenciador del NAD (NutritionFacts).",
            readTime: "Video",
            url: "https://nutritionfacts.org/es/video/riesgos-y-beneficios-de-la-nicotinamida-mononucleotida-na-potenciadora-del-nad/"
        },
        {
            id: 604,
            title: "Omega-3 i Salut Cerebral",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "Beneficis dels àcids grassos essencials per a la funció cognitiva i la reducció de la inflamació (MedlinePlus).",
            readTime: "Guia",
            url: "https://medlineplus.gov/spanish/ency/patientinstructions/000767.htm"
        },
        {
            id: 605,
            title: "Vitamina D i Sistema Immune",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "El paper clau de la vitamina D en la regulació immunitària i la salut òssia (MedlinePlus).",
            readTime: "Article",
            url: "https://medlineplus.gov/spanish/vitamind.html"
        },
        {
            id: 606,
            title: "Resveratrol i Envelliment",
            category: "suplements",
            type: "article",
            icon: BookOpen,
            desc: "L'impacte dels polifenols en l'activació de les sirtuïnes i la longevitat cel·lular (NIH).",
            readTime: "Article",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6164842/"
        },
        {
            id: 607,
            title: "Coenzim Q10 i Energia",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "Importància de la CoQ10 per a la funció mitocondrial i la salut cardíaca (MedlinePlus).",
            readTime: "Fitxa",
            url: "https://medlineplus.gov/spanish/druginfo/natural/938.html"
        },
        {
            id: 608,
            title: "Espermidina i Autofàgia",
            category: "suplements",
            type: "article",
            icon: BookOpen,
            desc: "Com l'espermidina pot induir l'autofàgia i promoure la renovació cel·lular (ScienceDirect).",
            readTime: "Estudi",
            url: "https://www.sciencedirect.com/science/article/pii/S221323171830188X"
        },
        {
            id: 609,
            title: "Vitamina B12 i Sistema Nerviós",
            category: "suplements",
            type: "article",
            icon: Pill,
            desc: "Essencial per al manteniment de les neurones i la formació de glòbuls vermells (NIH).",
            readTime: "Fitxa",
            url: "https://ods.od.nih.gov/factsheets/VitaminB12-DatosEnEspanol/"
        }
    ];

    const filtered = activeTab === 'all' ? resources : resources.filter(r => r.category === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <SEO
                title="Recursos i Eines"
                description="Accedeix a guies, lectures i eines recomanades per aprofundir en el teu benestar."
            />
            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="mb-16 text-center animate-enter">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                        Biblioteca Arrel
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Recursos & Acadèmia
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Una col·lecció curada d'articles, guies i vídeos per aprofundir en cada àrea de la teva longevitat.
                    </p>
                </div>

                {/* TABS */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {[
                        { id: 'all', label: 'Tots' },
                        { id: 'energia', label: 'Energia' },
                        { id: 'son', label: 'Son' },
                        { id: 'nutricio', label: 'Nutrició' },
                        { id: 'atencio', label: 'Atenció' },
                        { id: 'temps', label: 'Temps' },
                        { id: 'suplements', label: 'Suplements' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* GRID DE RECURSOS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(resource => (
                        <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer block"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${resource.type === 'video' ? 'bg-red-50 text-red-600' :
                                    resource.category === 'suplements' ? 'bg-teal-50 text-teal-600' :
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                    {resource.type === 'video' ? <Play size={24} /> :
                                        resource.category === 'suplements' ? <Pill size={24} /> :
                                            <BookOpen size={24} />}
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    {resource.category}
                                    <ExternalLink size={10} className="ml-1" />
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                {resource.desc}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-xs font-semibold text-gray-500">
                                    {resource.type === 'video' ? `${resource.duration} visualització` : `${resource.readTime} lectura`}
                                </span>
                                <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-bold">
                                    Accedir <ExternalLink size={14} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* VIDEO ACADEMY SECTION (Placeholder) */}
                <div className="mt-24 bg-gray-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 p-32 bg-blue-600 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white border border-white/20">
                            <GraduationCap size={40} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Arrel Academy</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                            Estem preparant una sèrie de masterclasses en vídeo amb experts en longevitat. Apunta't a la llista d'espera.
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl font-bold tracking-wide cursor-default">
                            Propera Obertura
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}
