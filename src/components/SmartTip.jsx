import React, { useState, useEffect } from 'react';
import { Lightbulb, Battery, Moon, Users, Brain } from 'lucide-react';

const SmartTip = () => {
    const [tip, setTip] = useState(null);

    useEffect(() => {
        // 1. Load Data
        const historicData = JSON.parse(localStorage.getItem('arrel_historic') || '[]');
        const latestDiag = historicData.length > 0 ? historicData[historicData.length - 1] : null;

        // Default Tip
        let selectedTip = {
            icon: Lightbulb,
            title: "Consell del Dia",
            text: "La consistència venç la intensitat. Fes una petita cosa avui.",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-200"
        };

        if (latestDiag && latestDiag.puntuacions) {
            const scores = latestDiag.puntuacions; // { energia, son, nutricio, aillam... }

            // Priority Logic: Find the lowest falling bucket
            if (scores.son < 50) {
                selectedTip = {
                    icon: Moon,
                    title: "Alerta de Descans",
                    text: "El teu son és baix. Avui la teva única prioritat és anar al llit 30 minuts abans.",
                    color: "text-indigo-600",
                    bg: "bg-indigo-50",
                    border: "border-indigo-200"
                };
            } else if (scores.energia < 50) {
                selectedTip = {
                    icon: Battery,
                    title: "Bateria Baixa",
                    text: "No intentis fer-ho tot avui. Tria només UNA tasca gran i deixa la resta.",
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                    border: "border-orange-200"
                };
            } else if (scores.atencio < 50) {
                selectedTip = {
                    icon: Brain,
                    title: "Dispersió Detectada",
                    text: "La teva atenció pateix. Intenta treballar en blocs de 25 minuts sense mòbil.",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                    border: "border-blue-200"
                };
            }
        }

        // Check Daily Progress (consistency check)
        const dailyProgress = JSON.parse(localStorage.getItem('arrel_progres') || '[]');
        if (dailyProgress.length > 3) {
            // Check streak
            const lastDays = dailyProgress.slice(-3);
            const allGood = lastDays.every(d => d.compliment > 80);
            if (allGood) {
                selectedTip = {
                    icon: Lightbulb,
                    title: "Ratxa Imparable",
                    text: "Portes 3 dies a un nivell excel·lent. És el moment de pujar la dificultat d'un protocol.",
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                    border: "border-purple-200"
                };
            }
        }

        setTip(selectedTip);
    }, []);

    if (!tip) return null;

    return (
        <div className={`mb-6 p-4 rounded-xl border ${tip.bg} ${tip.border} flex items-start gap-4 shadow-sm animate-fade-in`}>
            <div className={`p-2 rounded-full bg-white ${tip.color} shadow-sm shrink-0`}>
                <tip.icon size={20} />
            </div>
            <div>
                <h4 className={`font-bold text-sm ${tip.color} mb-1`}>{tip.title}</h4>
                <p className={`text-sm ${tip.color} opacity-90 leading-relaxed`}>
                    {tip.text}
                </p>
            </div>
        </div>
    );
};

export default SmartTip;
