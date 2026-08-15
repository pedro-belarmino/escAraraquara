import { useEffect, useState } from "react";
import { getFlorDeLisSubmissions } from "../firebase/florDeLis";
import { FlorDeLisSubmission } from "../types/florDeLis";

export default function FlorDeLisDashboard() {
  const [submissions, setSubmissions] = useState<FlorDeLisSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getFlorDeLisSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Data N/A";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString("pt-BR");
    }
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString("pt-BR");
    }
    return new Date(timestamp).toLocaleString("pt-BR");
  };

  const filteredSubmissions = submissions.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.nome.toLowerCase().includes(term) ||
      item.nomePreferido.toLowerCase().includes(term) ||
      item.profissao.toLowerCase().includes(term) ||
      item.areaConhecimento.toLowerCase().includes(term) ||
      item.habilidades.toLowerCase().includes(term)
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 md:p-8 bg-slate-50 min-h-screen rounded-2xl border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-300">
        <div>
          <h1 className="text-3xl font-extrabold text-[#00337C]">
            Relatório - Rede Flor de Lis
          </h1>
          <p className="text-gray-600 mt-1">
            Visualização dos dados de pessoas que preencheram o formulário
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchSubmissions}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Atualizar
          </button>
          <a
            href="/flor-de-lis"
            className="px-4 py-2 bg-[#FF654D] hover:bg-[#e0543c] text-white rounded-lg font-medium transition-colors inline-block"
          >
            + Novo Form
          </a>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-500 uppercase">
            Total de Respostas
          </span>
          <span className="text-4xl font-extrabold text-[#00337C] mt-2">
            {submissions.length}
          </span>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
          <label className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Buscar no relatório
          </label>
          <input
            type="text"
            placeholder="Buscar por nome, apelido, profissão, conhecimento, habilidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#FF654D] border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando respostas...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 text-gray-500">
          {submissions.length === 0
            ? "Nenhum formulário preenchido ainda."
            : "Nenhum resultado encontrado para a busca."}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((sub, index) => {
            const isExpanded = expandedId === (sub.id || String(index));
            const cardKey = sub.id || String(index);

            return (
              <div
                key={cardKey}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Header Summary Bar */}
                <div
                  onClick={() => toggleExpand(cardKey)}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#00337C]">
                        {sub.nome}
                      </h3>
                      {sub.nomePreferido && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                          "{sub.nomePreferido}"
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                      <span><strong>Celular:</strong> {sub.celular}</span>
                      <span><strong>Profissão:</strong> {sub.profissao}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">
                      {formatDate(sub.createdAt)}
                    </span>
                    <button className="text-gray-500 hover:text-gray-800 font-bold text-lg">
                      {isExpanded ? "▲" : "▼"}
                    </button>
                  </div>
                </div>

                {/* Detailed View */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50/50 border-t border-gray-200 space-y-6">
                    {/* Informações Pessoais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Já foi Escoteiro?
                        </span>
                        <p className="font-semibold text-gray-800">
                          {sub.jaFoiEscoteiro}
                          {sub.jaFoiEscoteiro === "Sim" && sub.anoEscoteiro && (
                            <span className="text-gray-600 font-normal"> ({sub.anoEscoteiro})</span>
                          )}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Pai / Responsável de jovem?
                        </span>
                        <p className="font-semibold text-gray-800">
                          {sub.paiOuResponsavel}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Endereço
                        </span>
                        <p className="font-semibold text-gray-800">
                          {sub.endereco}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Área de Conhecimento
                        </span>
                        <p className="font-semibold text-gray-800">
                          {sub.areaConhecimento}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Habilidades
                        </span>
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {sub.habilidades}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-3">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Contatos Profissionais / Institucionais
                        </span>
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {sub.contatosProfissionais}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-3">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Local para Acampamento sugerido
                        </span>
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {sub.conheceLocalAcampamento}
                        </p>
                      </div>
                    </div>

                    {/* Checkbox Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-[#00337C] uppercase block mb-2">
                          Disponibilidade aos finais de semana
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {sub.disponibilidade && sub.disponibilidade.length > 0 ? (
                            sub.disponibilidade.map((disp, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-[#00337C] border border-blue-200 text-xs px-3 py-1 rounded-full font-medium"
                              >
                                {disp}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">Nenhuma selecionada</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-[#00337C] uppercase block mb-2">
                          Equipes de apoio de interesse
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {sub.equipesApoio && sub.equipesApoio.length > 0 ? (
                            sub.equipesApoio.map((eq, i) => (
                              <span
                                key={i}
                                className="bg-orange-50 text-[#FF654D] border border-orange-200 text-xs px-3 py-1 rounded-full font-medium"
                              >
                                {eq}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">Nenhuma selecionada</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Outros Interesses */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Grupos de Trabalho
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            sub.interesseGruposTrabalho === "Sim"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.interesseGruposTrabalho}
                        </span>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Oficinas ou Palestras
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            sub.interesseOficinasPalestras === "Sim"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.interesseOficinasPalestras}
                        </span>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                          Apenas Contribuinte Financeiro
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            sub.apenasApoiadorFinanceiro === "Sim"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.apenasApoiadorFinanceiro}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
