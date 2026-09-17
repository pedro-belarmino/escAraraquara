import { ReactNode, useEffect, useMemo, useState } from "react";
import { getPreInscricaoSubmissions } from "../firebase/preInscricao";
import {
  FirestoreDate,
  PreInscricaoSubmission,
  AVALIACAO_ITEMS,
  CADASTRO_UNICO_OPTIONS,
  CIENCIA_JOVEM_OPTIONS,
  COMO_CONHECEU_OPTIONS,
  DEFICIENCIA_OPTIONS,
  DISPONIBILIDADE_RESPONSAVEL_OPTIONS,
  GENERO_OPTIONS,
  JA_SE_INSCREVEU_OPTIONS,
  MOTIVO_CADASTRO_OPTIONS,
  PERIODO_OPTIONS,
  RAMO_OPTIONS,
  TIPO_VAGA_OPTIONS,
} from "../types/preInscricao";

const TODOS = "Todos";

const ORDENACAO_OPTIONS = [
  "Mais recentes",
  "Mais antigas",
  "Nome (A-Z)",
  "Nome (Z-A)",
  "Idade (menor para maior)",
  "Idade (maior para menor)",
];

type Filtros = {
  busca: string;
  ramo: string;
  periodo: string;
  tipoVaga: string;
  genero: string;
  comoConheceu: string;
  motivoCadastro: string;
  cadastroUnico: string;
  jaSeInscreveu: string;
  disponibilidadeResponsavel: string;
  cienciaJovem: string;
  familiarInscrito: string;
  deficiencia: string;
  idadeMin: string;
  idadeMax: string;
  dataInicio: string;
  dataFim: string;
  ordenacao: string;
};

const FILTROS_INICIAIS: Filtros = {
  busca: "",
  ramo: TODOS,
  periodo: TODOS,
  tipoVaga: TODOS,
  genero: TODOS,
  comoConheceu: TODOS,
  motivoCadastro: TODOS,
  cadastroUnico: TODOS,
  jaSeInscreveu: TODOS,
  disponibilidadeResponsavel: TODOS,
  cienciaJovem: TODOS,
  familiarInscrito: TODOS,
  deficiencia: TODOS,
  idadeMin: "",
  idadeMax: "",
  dataInicio: "",
  dataFim: "",
  ordenacao: ORDENACAO_OPTIONS[0],
};

const INPUT_CLASS =
  "w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#FF654D] outline-none text-sm";

/** Converte o campo createdAt (Timestamp do Firestore, objeto serializado ou data) em Date. */
const toDate = (timestamp?: FirestoreDate): Date | null => {
  if (!timestamp) return null;
  if (timestamp instanceof Date) return timestamp;
  if (typeof timestamp === "string") {
    const parsed = new Date(timestamp);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  if ("toDate" in timestamp) return timestamp.toDate();
  return new Date(timestamp.seconds * 1000);
};

const formatDate = (timestamp?: FirestoreDate) => {
  const date = toDate(timestamp);
  return date ? date.toLocaleString("pt-BR") : "Data N/A";
};

const formatBirthDate = (dataNascimento: string) => {
  if (!dataNascimento) return "Não informado";
  const date = new Date(`${dataNascimento}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? dataNascimento
    : date.toLocaleDateString("pt-BR");
};

const calcularIdade = (dataNascimento: string): number | null => {
  if (!dataNascimento) return null;
  const nascimento = new Date(`${dataNascimento}T00:00:00`);
  if (Number.isNaN(nascimento.getTime())) return null;

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

const ramoDaVaga = (tipoVaga: string): string => {
  if (/Lobinh/i.test(tipoVaga)) return "Lobinhos";
  if (/Escoteir/i.test(tipoVaga)) return "Escoteiros";
  if (/Pioneir/i.test(tipoVaga)) return "Pioneiros";
  return "Não informado";
};

const periodoDaVaga = (tipoVaga: string): string => {
  if (/manh/i.test(tipoVaga)) return "Manhã";
  if (/tarde/i.test(tipoVaga)) return "Tarde";
  return "Não informado";
};

const mediaAvaliacao = (avaliacao: Record<string, number> | undefined): string => {
  if (!avaliacao) return "—";
  const notas = AVALIACAO_ITEMS.map((item) => avaliacao[item]).filter(
    (nota): nota is number => typeof nota === "number"
  );
  if (notas.length === 0) return "—";
  const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
  return media.toFixed(1);
};

type SelectFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
      >
        <option value={TODOS}>{TODOS}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type DetailProps = {
  label: string;
  value?: ReactNode;
  wide?: boolean;
};

function Detail({ label, value, wide }: DetailProps) {
  return (
    <div
      className={`bg-white p-4 rounded-lg border border-gray-200 ${wide ? "md:col-span-3" : ""
        }`}
    >
      <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
        {label}
      </span>
      <p className="font-semibold text-gray-800 whitespace-pre-wrap">
        {value || "Não informado"}
      </p>
    </div>
  );
}

export default function PreInscricaoDashboard() {
  const [submissions, setSubmissions] = useState<PreInscricaoSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAIS);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getPreInscricaoSubmissions();
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

  const setFiltro = <K extends keyof Filtros>(campo: K, valor: Filtros[K]) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const filtrosAtivos = useMemo(() => {
    return (Object.keys(FILTROS_INICIAIS) as (keyof Filtros)[]).filter(
      (campo) => campo !== "ordenacao" && filtros[campo] !== FILTROS_INICIAIS[campo]
    ).length;
  }, [filtros]);

  const filteredSubmissions = useMemo(() => {
    const termo = filtros.busca.trim().toLowerCase();
    const idadeMin = filtros.idadeMin ? Number(filtros.idadeMin) : null;
    const idadeMax = filtros.idadeMax ? Number(filtros.idadeMax) : null;
    const dataInicio = filtros.dataInicio ? new Date(`${filtros.dataInicio}T00:00:00`) : null;
    const dataFim = filtros.dataFim ? new Date(`${filtros.dataFim}T23:59:59`) : null;

    const resultado = submissions.filter((sub) => {
      if (termo) {
        const campos = [
          sub.nomeCompleto,
          sub.nomeResponsavel,
          sub.emailContato,
          sub.telefoneContato,
          sub.telefoneAdicional,
          sub.indicacaoGrupo,
          sub.familiaresPreInscritos,
          sub.observacoesGerais,
        ];
        const encontrou = campos.some((campo) =>
          (campo ?? "").toLowerCase().includes(termo)
        );
        if (!encontrou) return false;
      }

      if (filtros.ramo !== TODOS && ramoDaVaga(sub.tipoVaga) !== filtros.ramo) return false;
      if (filtros.periodo !== TODOS && periodoDaVaga(sub.tipoVaga) !== filtros.periodo)
        return false;
      if (filtros.tipoVaga !== TODOS && sub.tipoVaga !== filtros.tipoVaga) return false;
      if (filtros.genero !== TODOS && sub.genero !== filtros.genero) return false;
      if (filtros.comoConheceu !== TODOS && sub.comoConheceu !== filtros.comoConheceu)
        return false;
      if (filtros.motivoCadastro !== TODOS && sub.motivoCadastro !== filtros.motivoCadastro)
        return false;
      if (filtros.cadastroUnico !== TODOS && sub.cadastroUnico !== filtros.cadastroUnico)
        return false;
      if (filtros.jaSeInscreveu !== TODOS && sub.jaSeInscreveu !== filtros.jaSeInscreveu)
        return false;
      if (
        filtros.disponibilidadeResponsavel !== TODOS &&
        sub.disponibilidadeResponsavel !== filtros.disponibilidadeResponsavel
      )
        return false;
      if (filtros.cienciaJovem !== TODOS && sub.cienciaJovem !== filtros.cienciaJovem)
        return false;
      if (
        filtros.familiarInscrito !== TODOS &&
        sub.familiarInscrito !== filtros.familiarInscrito
      )
        return false;
      if (filtros.deficiencia !== TODOS && sub.deficiencia !== filtros.deficiencia)
        return false;

      const idade = calcularIdade(sub.dataNascimento);
      if (idadeMin !== null && (idade === null || idade < idadeMin)) return false;
      if (idadeMax !== null && (idade === null || idade > idadeMax)) return false;

      const enviadoEm = toDate(sub.createdAt);
      if (dataInicio && (!enviadoEm || enviadoEm < dataInicio)) return false;
      if (dataFim && (!enviadoEm || enviadoEm > dataFim)) return false;

      return true;
    });

    const ordenado = [...resultado];
    ordenado.sort((a, b) => {
      switch (filtros.ordenacao) {
        case "Mais antigas":
          return (toDate(a.createdAt)?.getTime() ?? 0) - (toDate(b.createdAt)?.getTime() ?? 0);
        case "Nome (A-Z)":
          return (a.nomeCompleto ?? "").localeCompare(b.nomeCompleto ?? "", "pt-BR");
        case "Nome (Z-A)":
          return (b.nomeCompleto ?? "").localeCompare(a.nomeCompleto ?? "", "pt-BR");
        case "Idade (menor para maior)":
          return (calcularIdade(a.dataNascimento) ?? 0) - (calcularIdade(b.dataNascimento) ?? 0);
        case "Idade (maior para menor)":
          return (calcularIdade(b.dataNascimento) ?? 0) - (calcularIdade(a.dataNascimento) ?? 0);
        default:
          return (toDate(b.createdAt)?.getTime() ?? 0) - (toDate(a.createdAt)?.getTime() ?? 0);
      }
    });

    return ordenado;
  }, [submissions, filtros]);

  const resumo = useMemo(() => {
    const contarPor = (fn: (sub: PreInscricaoSubmission) => string) =>
      filteredSubmissions.reduce<Record<string, number>>((acc, sub) => {
        const chave = fn(sub);
        acc[chave] = (acc[chave] ?? 0) + 1;
        return acc;
      }, {});

    return {
      porRamo: contarPor((sub) => ramoDaVaga(sub.tipoVaga)),
      porPeriodo: contarPor((sub) => periodoDaVaga(sub.tipoVaga)),
      comDeficiencia: filteredSubmissions.filter(
        (sub) => sub.deficiencia && sub.deficiencia !== "Não possui deficiência"
      ).length,
      cadastroUnico: filteredSubmissions.filter((sub) => sub.cadastroUnico === "Sim.").length,
      comFamiliar: filteredSubmissions.filter((sub) => sub.familiarInscrito === "Sim").length,
    };
  }, [filteredSubmissions]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 md:p-8 bg-slate-50 min-h-screen rounded-2xl border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-300">
        <div>
          <h1 className="text-3xl font-extrabold text-[#00337C]">
            Relatório - Pré-Inscrição 2º Semestre 2026
          </h1>
          <p className="text-gray-600 mt-1">
            Visualização das pré-inscrições recebidas pelo formulário
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
            href="/pre-inscricao"
            className="px-4 py-2 bg-[#FF654D] hover:bg-[#e0543c] text-white rounded-lg font-medium transition-colors inline-block"
          >
            + Nova Pré-Inscrição
          </a>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase block">
            Total de pré-inscrições
          </span>
          <span className="text-4xl font-extrabold text-[#00337C]">
            {submissions.length}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase block">
            Exibindo no filtro
          </span>
          <span className="text-4xl font-extrabold text-[#FF654D]">
            {filteredSubmissions.length}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase block mb-2">
            Por ramo
          </span>
          <div className="space-y-1 text-sm text-gray-700">
            {RAMO_OPTIONS.map((ramo) => (
              <div key={ramo} className="flex justify-between">
                <span>{ramo}</span>
                <strong>{resumo.porRamo[ramo] ?? 0}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase block mb-2">
            Outros recortes
          </span>
          <div className="space-y-1 text-sm text-gray-700">
            {PERIODO_OPTIONS.map((periodo) => (
              <div key={periodo} className="flex justify-between">
                <span>{periodo}</span>
                <strong>{resumo.porPeriodo[periodo] ?? 0}</strong>
              </div>
            ))}
            <div className="flex justify-between">
              <span>Com deficiência</span>
              <strong>{resumo.comDeficiencia}</strong>
            </div>
            <div className="flex justify-between">
              <span>Cadastro Único</span>
              <strong>{resumo.cadastroUnico}</strong>
            </div>
            <div className="flex justify-between">
              <span>Com familiar inscrito</span>
              <strong>{resumo.comFamiliar}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Busca e filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome do jovem, responsável, e-mail, telefone, indicação, observações..."
              value={filtros.busca}
              onChange={(e) => setFiltro("busca", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div className="md:w-64">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Ordenar por
            </label>
            <select
              value={filtros.ordenacao}
              onChange={(e) => setFiltro("ordenacao", e.target.value)}
              className={INPUT_CLASS}
            >
              {ORDENACAO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {filtrosAbertos ? "Ocultar filtros" : "Mostrar filtros"}
            {filtrosAtivos > 0 && (
              <span className="ml-2 bg-[#FF654D] text-white text-xs px-2 py-0.5 rounded-full">
                {filtrosAtivos}
              </span>
            )}
          </button>
        </div>

        {filtrosAbertos && (
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SelectFilter
                label="Ramo"
                value={filtros.ramo}
                options={RAMO_OPTIONS}
                onChange={(value) => setFiltro("ramo", value)}
              />
              <SelectFilter
                label="Período"
                value={filtros.periodo}
                options={PERIODO_OPTIONS}
                onChange={(value) => setFiltro("periodo", value)}
              />
              <SelectFilter
                label="Gênero do jovem"
                value={filtros.genero}
                options={GENERO_OPTIONS}
                onChange={(value) => setFiltro("genero", value)}
              />
              <div className="lg:col-span-3">
                <SelectFilter
                  label="Tipo da vaga"
                  value={filtros.tipoVaga}
                  options={TIPO_VAGA_OPTIONS}
                  onChange={(value) => setFiltro("tipoVaga", value)}
                />
              </div>
              <SelectFilter
                label="Como conheceu"
                value={filtros.comoConheceu}
                options={COMO_CONHECEU_OPTIONS}
                onChange={(value) => setFiltro("comoConheceu", value)}
              />
              <SelectFilter
                label="Motivo do cadastro"
                value={filtros.motivoCadastro}
                options={MOTIVO_CADASTRO_OPTIONS}
                onChange={(value) => setFiltro("motivoCadastro", value)}
              />
              <SelectFilter
                label="Cadastro Único"
                value={filtros.cadastroUnico}
                options={CADASTRO_UNICO_OPTIONS}
                onChange={(value) => setFiltro("cadastroUnico", value)}
              />
              <SelectFilter
                label="Já se inscreveu antes"
                value={filtros.jaSeInscreveu}
                options={JA_SE_INSCREVEU_OPTIONS}
                onChange={(value) => setFiltro("jaSeInscreveu", value)}
              />
              <SelectFilter
                label="Disponibilidade do responsável"
                value={filtros.disponibilidadeResponsavel}
                options={DISPONIBILIDADE_RESPONSAVEL_OPTIONS}
                onChange={(value) => setFiltro("disponibilidadeResponsavel", value)}
              />
              <SelectFilter
                label="Ciência do jovem"
                value={filtros.cienciaJovem}
                options={CIENCIA_JOVEM_OPTIONS}
                onChange={(value) => setFiltro("cienciaJovem", value)}
              />
              <SelectFilter
                label="Familiar inscrito"
                value={filtros.familiarInscrito}
                options={["Sim", "Não"]}
                onChange={(value) => setFiltro("familiarInscrito", value)}
              />
              <SelectFilter
                label="Deficiência"
                value={filtros.deficiencia}
                options={DEFICIENCIA_OPTIONS}
                onChange={(value) => setFiltro("deficiencia", value)}
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Idade mín.
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtros.idadeMin}
                    onChange={(e) => setFiltro("idadeMin", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Idade máx.
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtros.idadeMax}
                    onChange={(e) => setFiltro("idadeMax", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Enviado de
                  </label>
                  <input
                    type="date"
                    value={filtros.dataInicio}
                    onChange={(e) => setFiltro("dataInicio", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Enviado até
                  </label>
                  <input
                    type="date"
                    value={filtros.dataFim}
                    onChange={(e) => setFiltro("dataFim", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setFiltros(FILTROS_INICIAIS)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#FF654D] border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando respostas...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 text-gray-500">
          {submissions.length === 0
            ? "Nenhuma pré-inscrição recebida ainda."
            : "Nenhum resultado encontrado para os filtros aplicados."}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((sub, index) => {
            const cardKey = sub.id || String(index);
            const isExpanded = expandedId === cardKey;
            const idade = calcularIdade(sub.dataNascimento);

            return (
              <div
                key={cardKey}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all"
              >
                <div
                  onClick={() => toggleExpand(cardKey)}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-[#00337C]">
                        {sub.nomeCompleto}
                      </h3>
                      <span className="bg-orange-50 text-[#FF654D] border border-orange-200 text-xs px-2.5 py-1 rounded-full font-medium">
                        {ramoDaVaga(sub.tipoVaga)} · {periodoDaVaga(sub.tipoVaga)}
                      </span>
                      {idade !== null && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                          {idade} anos
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                      <span><strong>Responsável:</strong> {sub.nomeResponsavel}</span>
                      <span><strong>Telefone:</strong> {sub.telefoneContato}</span>
                      <span><strong>E-mail:</strong> {sub.emailContato}</span>
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

                {isExpanded && (
                  <div className="p-6 bg-slate-50/50 border-t border-gray-200 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Detail label="Tipo da vaga" value={sub.tipoVaga} />
                      <Detail
                        label="Data de nascimento"
                        value={formatBirthDate(sub.dataNascimento)}
                      />
                      <Detail label="Gênero do(a) jovem" value={sub.genero} />

                      <Detail label="Telefone de contato" value={sub.telefoneContato} />
                      <Detail label="Telefone adicional" value={sub.telefoneAdicional} />
                      <Detail label="E-mail de contato" value={sub.emailContato} />

                      <Detail label="Como conheceu" value={sub.comoConheceu} wide />
                      <Detail label="Cadastro Único" value={sub.cadastroUnico} />
                      <Detail
                        label="Já se inscreveu antes"
                        value={
                          sub.jaSeInscreveu === "Outro" && sub.jaSeInscreveuOutro
                            ? `Outro: ${sub.jaSeInscreveuOutro}`
                            : sub.jaSeInscreveu
                        }
                      />
                      <Detail label="Motivo do cadastro" value={sub.motivoCadastro} />

                      <Detail
                        label="Disponibilidade do responsável"
                        value={sub.disponibilidadeResponsavel}
                      />
                      <Detail label="Ciência do jovem" value={sub.cienciaJovem} />
                      <Detail label="Familiar inscrito" value={sub.familiarInscrito} />

                      {sub.familiarInscrito === "Sim" && (
                        <Detail
                          label="Familiares pré-inscritos e parentesco"
                          value={sub.familiaresPreInscritos}
                          wide
                        />
                      )}

                      <Detail
                        label="Indicação de alguém do Grupo"
                        value={sub.indicacaoGrupo}
                        wide
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Detail label="Deficiência" value={sub.deficiencia} />
                      <Detail
                        label="Descrição da deficiência"
                        value={sub.descricaoDeficiencia}
                      />
                      <Detail
                        label="Média da escala (1 a 5)"
                        value={mediaAvaliacao(sub.avaliacaoJovem)}
                      />
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <span className="text-xs font-bold text-[#00337C] uppercase block mb-3">
                        Escala de 1 (não possui) a 5 (possui muita)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AVALIACAO_ITEMS.map((item) => (
                          <div
                            key={item}
                            className="flex justify-between gap-3 text-sm text-gray-700 border-b border-gray-100 py-1"
                          >
                            <span>{item}</span>
                            <strong className="text-[#FF654D]">
                              {sub.avaliacaoJovem?.[item] ?? "—"}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Detail
                      label="Observações gerais"
                      value={sub.observacoesGerais}
                      wide
                    />
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
