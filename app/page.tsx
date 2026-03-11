"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
    // vars do bgl
    const [ativa, setAtiva] = useState("");
    const [reativa, setReativa] = useState("");
    const [aparente, setAparente] = useState("");
    const [fp, setFp] = useState("");
    const [tipoFp, setTipoFp] = useState("angulo");

    // função q fez eu ficar acordado até altas horas (refs?)
    const calcular = () => {
        // isso impede NAN e vírgulas de dar problemasss
        let P = parseFloat(ativa.replace(",", ".")) || 0;
        let Q = parseFloat(reativa.replace(",", ".")) || 0;
        let S = parseFloat(aparente.replace(",", ".")) || 0;
        const valFP = parseFloat(fp.replace(",", ".")) || 0;
        let vSeno = 0, vCosseno = 0;

        // condicionais
        if (valFP !== 0) {
            if (tipoFp === "angulo") {
                const rad = valFP * (Math.PI / 180);
                vSeno = Math.sin(rad);
                vCosseno = Math.cos(rad);

            } else if (tipoFp === "cosseno") {
                const rad = Math.acos(valFP);
                vSeno = Math.sin(rad);
                vCosseno = valFP;

            }
        }

        if (vCosseno !== 0 && P !== 0) {
            S = P / vCosseno;
            Q = vSeno * S;
        }

        else if (vCosseno !== 0 && S !== 0) {
            P = S * vCosseno;
            Q = S * vSeno;
        }

        else if (P !== 0 && Q !== 0) {
            S = Math.sqrt(Math.pow(P, 2) + Math.pow(Q, 2));
            vCosseno = P / S;
        }

        else if (P !== 0 && S !== 0) {
            Q = Math.sqrt(Math.pow(S, 2) - Math.pow(P, 2));
            vCosseno = P / S;
        }


        setAtiva(P.toFixed(2));
        setReativa(Q.toFixed(2));
        setAparente(S.toFixed(2));
        if (vCosseno !== 0) setFp(vCosseno.toFixed(3));
    };

    // aqui é a prr do html
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <header>
                <div className="grid grid-cols-3 items-center py-10 px-10">
                    <div className="flex justify-start">
                        <Image
                            src="/FZL.png"
                            alt="FZL"
                            width={250}
                            height={50}
                        />
                    </div>

                    <div className="flex justify-center self-start">
                        <Image
                            src="/senailogo.png"
                            alt="SENAILOGO"
                            width={250}
                            height={50}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Image
                            src="/MSP.png"
                            alt="MOVIMENTOFAZUELI"
                            width={250}
                            height={50}
                        />
                    </div>
                </div>

            </header>
            <main className="grid grid-cols-3 items-center max-w-7xl mx-auto px-10">
                <h1 className="col-span-3 text-4xl font-semibold dark:text-zinc-50 mb-10">
                    CALCULADORA DE TRIÂNGULO DE POTÊNCIA 1T1ELE
                </h1>
                <div className="hidden md:block"></div>
                <div className="flex flex-col gap-4 max-w-md">

                    <input
                        type="number"
                        placeholder="Potência Ativa (W)"
                        value={ativa}
                        onChange={(e) => setAtiva(e.target.value)}
                        className="p-2 border rounded-md bg-zinc-900 border-zinc-700 text-white"
                    />

                    <input
                        type="number"
                        placeholder="Potência Reativa (VAr)"
                        value={reativa}
                        onChange={(e) => setReativa(e.target.value)}
                        className="p-2 border rounded-md bg-zinc-900 border-zinc-700 text-white"
                    />

                    <input
                        type="number"
                        placeholder="Potência Aparente (VA)"
                        value={aparente}
                        onChange={(e) => setAparente(e.target.value)}
                        className="p-2 border rounded-md bg-zinc-900 border-zinc-700 text-white"
                    />


                    <div className="flex items-center gap-6 my-2">
                        <label className="flex items-center gap-2 cursor-pointer text-zinc-200">
                            <input
                                type="radio"
                                name="tipoFp"
                                checked={tipoFp === "angulo"}
                                onChange={() => setTipoFp("angulo")}
                                className="w-4 h-4"
                            />
                            Ângulo
                        </label>
                        <label className=" flex items-center gap-2 cursor-pointer text-zinc-200">
                            <input
                                type="radio"
                                name="tipoFp"
                                checked={tipoFp === "cosseno"}
                                onChange={() => setTipoFp("cosseno")}
                                className="w-4 h-4"
                            />
                            Cosseno
                        </label>
                    </div>

                    <input
                        type="number"
                        placeholder={tipoFp === "angulo" ? "Graus (°)" : "Valor do FP (0.00)"}
                        value={fp}
                        onChange={(e) => setFp(e.target.value)}
                        className="p-2 border rounded-md bg-zinc-900 border-zinc-700 text-white"
                    />

                    <button
                        onClick={calcular}
                        className="mt-4 bg-red-600 text-white p-3 rounded-md hover:bg-red-700 font-bold transition-colors"
                    >
                        CALCULAR
                    </button>

                    <button
                        onClick={() => {setAtiva(""); setReativa(""); setAparente(""); setFp("");}}
                        className="text-zinc-400 text-sm hover:underline"
                    >
                        Limpar valores
                    </button>
                </div>
            </main>
        </div>
    );
}