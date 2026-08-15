import React, { useState } from "react";
import { submitFlorDeLisForm } from "../firebase/florDeLis";
import { FlorDeLisFormData } from "../types/florDeLis";

const DISPONIBILIDADE_OPTIONS = [
  "Sábado de manhã",
  "Sábado à tarde",
  "Domingo de manhã",
  "Domingo à tarde",
  "Feriados",
  "Sem disponibilidade",
];

const EQUIPES_APOIO_OPTIONS = [
  "Captação de recursos e patrocínios",
  "Comunicação e divulgação",
  "Compras",
  "Logística",
  "Montagem",
  "Decoração",
  "Transporte",
  "Alimentação",
  "Fotografia e filmagem",
  "Desmontagem",
  "Limpeza",
  "Participação em FESTAS proporcionadas pela Associação",
  "Participações em eventos (distritais, nacionais e internacionais)",
  "Sem disponibilidade",
];

export default function FlorDeLisForm() {
  const [formData, setFormData] = useState<FlorDeLisFormData>({
    jaFoiEscoteiro: "Não",
    anoEscoteiro: "",
    paiOuResponsavel: "Não",
    nome: "",
    nomePreferido: "",
    endereco: "",
    celular: "",
    profissao: "",
    areaConhecimento: "",
    habilidades: "",
    contatosProfissionais: "",
    conheceLocalAcampamento: "",
    disponibilidade: [],
    equipesApoio: [],
    interesseGruposTrabalho: "Não",
    interesseOficinasPalestras: "Não",
    apenasApoiadorFinanceiro: "Não",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conheceLocalAcampamentoResposta, setConheceLocalAcampamentoResposta] =
    useState<"Sim" | "Não" | "">("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxGroup = (
    field: "disponibilidade" | "equipesApoio",
    value: string
  ) => {
    setFormData((prev) => {
      const currentList = prev[field];

      if (value === "Sem disponibilidade") {
        return {
          ...prev,
          [field]: currentList.includes(value) ? [] : [value],
        };
      }

      const listWithoutNoAvailability = currentList.filter(
        (item) => item !== "Sem disponibilidade"
      );

      if (currentList.includes(value)) {
        return {
          ...prev,
          [field]: listWithoutNoAvailability.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [field]: [...listWithoutNoAvailability, value],
        };
      }
    });
  };

  const validateForm = (): boolean => {
    if (!formData.nome.trim()) return false;
    if (!formData.endereco.trim()) return false;
    if (!formData.celular.trim()) return false;
    if (!formData.profissao.trim()) return false;
    if (!conheceLocalAcampamentoResposta) return false;

    if (
      conheceLocalAcampamentoResposta === "Sim" &&
      !formData.conheceLocalAcampamento.trim()
    ) {
      return false;
    }

    if (formData.jaFoiEscoteiro === "Sim" && !formData.anoEscoteiro?.trim()) {
      return false;
    }

    if (formData.disponibilidade.length === 0) return false;
    if (formData.equipesApoio.length === 0) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage(
        "Por favor, preencha todos os campos obrigatórios e selecione ao menos uma opção para disponibilidade e equipes de apoio."
      );
      return;
    }

    setLoading(true);
    try {
      await submitFlorDeLisForm(formData);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao enviar o formulário. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-lg rounded-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-[#00337C] mb-4">
          Formulário enviado com sucesso!
        </h2>
        <p className="text-gray-600 mb-8">
          Agradecemos a sua participação e o seu interesse em contribuir com a Rede Flor de Lis!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setConheceLocalAcampamentoResposta("");
              setFormData({
                jaFoiEscoteiro: "Não",
                anoEscoteiro: "",
                paiOuResponsavel: "Não",
                nome: "",
                nomePreferido: "",
                endereco: "",
                celular: "",
                profissao: "",
                areaConhecimento: "",
                habilidades: "",
                contatosProfissionais: "",
                conheceLocalAcampamento: "",
                disponibilidade: [],
                equipesApoio: [],
                interesseGruposTrabalho: "Não",
                interesseOficinasPalestras: "Não",
                apenasApoiadorFinanceiro: "Não",
              });
            }}
            className="px-6 py-3 bg-[#FF654D] text-white font-semibold rounded-lg hover:bg-[#e0543c] transition-colors"
          >
            Preencher outro formulário
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-10 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="border-b pb-6 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FF654D] mb-2">
          Rede Flor de Lis
        </h1>
        <p className="text-gray-600 font-medium">
          Preencha o formulário abaixo.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r">
          <p className="font-semibold">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Histórico Escoteiro */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Informações Iniciais
          </h2>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Você já foi Escoteiro? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jaFoiEscoteiro"
                  value="Sim"
                  checked={formData.jaFoiEscoteiro === "Sim"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jaFoiEscoteiro"
                  value="Não"
                  checked={formData.jaFoiEscoteiro === "Não"}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prev) => ({ ...prev, anoEscoteiro: "" }));
                  }}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>
          </div>

          {formData.jaFoiEscoteiro === "Sim" && (
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Em que ano? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="anoEscoteiro"
                value={formData.anoEscoteiro}
                onChange={handleInputChange}
                placeholder="Ex: 2015 a 2018"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] focus:border-transparent outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Você é pai ou responsável de um jovem? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paiOuResponsavel"
                  value="Sim"
                  checked={formData.paiOuResponsavel === "Sim"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paiOuResponsavel"
                  value="Não"
                  checked={formData.paiOuResponsavel === "Não"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>
          </div>
        </div>

        {/* Ficha de InscriÃ§Ã£o */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Ficha de Inscrição
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Nome: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Gosta de ser chamado de: <span className="font-extralight">(opcional)</span>
              </label>
              <input
                type="text"
                name="nomePreferido"
                value={formData.nomePreferido}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Endereço: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Celular: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Profissão: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="profissao"
                value={formData.profissao}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Área de conhecimento: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="areaConhecimento"
              value={formData.areaConhecimento}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Habilidades: <span className="font-extralight">(opcional)</span>
            </label>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Contatos profissionais e institucionais: <span className="font-extralight">(opcional)</span>
            </label>
            <textarea
              name="contatosProfissionais"
              value={formData.contatosProfissionais}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
            />
          </div>
        </div>

        {/* Local para Acampamento */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Sugestão de Locais
          </h2>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Conhece algum local para ACAMPAMENTO do Grupo ou Seção no final de semana ou feriados?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="conheceLocalAcampamentoResposta"
                  value="Sim"
                  checked={conheceLocalAcampamentoResposta === "Sim"}
                  onChange={() => {
                    setConheceLocalAcampamentoResposta("Sim");
                    setFormData((prev) => ({
                      ...prev,
                      conheceLocalAcampamento:
                        prev.conheceLocalAcampamento === "Não"
                          ? ""
                          : prev.conheceLocalAcampamento,
                    }));
                  }}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="conheceLocalAcampamentoResposta"
                  value="Não"
                  checked={conheceLocalAcampamentoResposta === "Não"}
                  onChange={() => {
                    setConheceLocalAcampamentoResposta("Não");
                    setFormData((prev) => ({
                      ...prev,
                      conheceLocalAcampamento: "Não",
                    }));
                  }}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>

            {conheceLocalAcampamentoResposta === "Sim" && (
              <textarea
                name="conheceLocalAcampamento"
                value={formData.conheceLocalAcampamento}
                onChange={handleInputChange}
                rows={3}
                placeholder="Descreva o local"
                required
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
              />
            )}
          </div>
        </div>

        {/* Formas de participação */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Formas de Participação
          </h2>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Qual seria sua disponibilidade aos finais de semana? (Selecione pelo menos uma option){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {DISPONIBILIDADE_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#FF654D] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.disponibilidade.includes(option)}
                    onChange={() => handleCheckboxGroup("disponibilidade", option)}
                    className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D] rounded"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Equipes de apoio */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Equipes de Apoio
          </h2>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Qual equipe de apoio gostaria de atuar em eventos? (Selecione pelo menos uma opção){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {EQUIPES_APOIO_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#FF654D] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.equipesApoio.includes(option)}
                    onChange={() => handleCheckboxGroup("equipesApoio", option)}
                    className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D] rounded"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Outros Interesses */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Outros Interesses
          </h2>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Interesse em integrar grupos de trabalho? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="interesseGruposTrabalho"
                  value="Sim"
                  checked={formData.interesseGruposTrabalho === "Sim"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="interesseGruposTrabalho"
                  value="Não"
                  checked={formData.interesseGruposTrabalho === "Não"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Interesse em integrar oficinas ou palestras? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="interesseOficinasPalestras"
                  value="Sim"
                  checked={formData.interesseOficinasPalestras === "Sim"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="interesseOficinasPalestras"
                  value="Não"
                  checked={formData.interesseOficinasPalestras === "Não"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Interesse em ser apenas CONTRIBUINTE E APOIADOR FINANCEIRO, sem necessidade de participação presencial?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="apenasApoiadorFinanceiro"
                  value="Sim"
                  checked={formData.apenasApoiadorFinanceiro === "Sim"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="apenasApoiadorFinanceiro"
                  value="Não"
                  checked={formData.apenasApoiadorFinanceiro === "Não"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D]"
                />
                Não
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#FF654D] hover:bg-[#e0543c] text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Formulário"}
        </button>
      </form>
    </div>
  );
}