import React, { useState } from "react";
import { submitPreInscricaoForm } from "../firebase/preInscricao";
import {
  PreInscricaoFormData,
  AVALIACAO_ITEMS,
  CADASTRO_UNICO_OPTIONS,
  CIENCIA_JOVEM_OPTIONS,
  COMO_CONHECEU_OPTIONS,
  DEFICIENCIA_OPTIONS,
  DISPONIBILIDADE_RESPONSAVEL_OPTIONS,
  GENERO_OPTIONS,
  JA_SE_INSCREVEU_OPTIONS,
  MOTIVO_CADASTRO_OPTIONS,
  TIPO_VAGA_OPTIONS,
} from "../types/preInscricao";

const INITIAL_FORM_DATA: PreInscricaoFormData = {
  cienteAviso: false,
  comoConheceu: "",
  tipoVaga: "",
  dataNascimento: "",
  nomeCompleto: "",
  genero: "",
  nomeResponsavel: "",
  telefoneContato: "",
  telefoneAdicional: "",
  emailContato: "",
  cadastroUnico: "",
  jaSeInscreveu: "",
  jaSeInscreveuOutro: "",
  motivoCadastro: "",
  disponibilidadeResponsavel: "",
  cienciaJovem: "",
  indicacaoGrupo: "",
  familiarInscrito: "",
  familiaresPreInscritos: "",
  deficiencia: "",
  descricaoDeficiencia: "",
  avaliacaoJovem: {},
  observacoesGerais: "",
};

const INPUT_CLASS =
  "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF654D] outline-none";

const SECTION_CLASS =
  "bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6";

/** Calcula a idade em anos completos na data de hoje. */
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

/** Lê a faixa etária do rótulo da vaga, ex.: "(7 A 10 ANOS) Lobinho..." -> [7, 10]. */
const faixaEtariaDaVaga = (tipoVaga: string): [number, number] | null => {
  const match = tipoVaga.match(/\((\d+)\s*A\s*(\d+)\s*ANOS\)/i);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
};

/** Formata o telefone no padrão pedido pelo formulário: 16 12345-6789. */
const formatarTelefone = (valor: string): string => {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 7) return `${digitos.slice(0, 2)} ${digitos.slice(2)}`;
  return `${digitos.slice(0, 2)} ${digitos.slice(2, digitos.length - 4)}-${digitos.slice(
    digitos.length - 4
  )}`;
};

type FieldLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  hint?: React.ReactNode;
};

function FieldLabel({ children, required, hint }: FieldLabelProps) {
  return (
    <div className="mb-2">
      <label className="block text-gray-800 font-semibold">
        {children} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-sm text-gray-600 mt-1">{hint}</p>}
    </div>
  );
}

type RadioGroupProps = {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#FF654D] cursor-pointer transition-colors"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="w-4 h-4 mt-1 text-[#FF654D] focus:ring-[#FF654D]"
          />
          <span className="text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default function PreInscricaoForm() {
  const [formData, setFormData] = useState<PreInscricaoFormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const idade = calcularIdade(formData.dataNascimento);
  const faixaVaga = faixaEtariaDaVaga(formData.tipoVaga);
  const idadeForaDaFaixa =
    idade !== null && faixaVaga !== null && (idade < faixaVaga[0] || idade > faixaVaga[1]);

  const setField = <K extends keyof PreInscricaoFormData>(
    field: K,
    value: PreInscricaoFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvaliacaoChange = (item: string, nota: number) => {
    setFormData((prev) => ({
      ...prev,
      avaliacaoJovem: { ...prev.avaliacaoJovem, [item]: nota },
    }));
  };

  const validateForm = (): string => {
    if (!formData.cienteAviso)
      return "É necessário ler e concordar com o aviso sobre as vagas para prosseguir.";
    if (!formData.comoConheceu) return "Informe como conheceu o Movimento Escoteiro.";
    if (!formData.tipoVaga) return "Selecione o tipo da vaga de interesse.";
    if (!formData.dataNascimento) return "Informe a data de nascimento do jovem.";
    if (!formData.nomeCompleto.trim()) return "Informe o nome completo do jovem.";
    if (!formData.genero) return "Informe o gênero do(a) jovem.";
    if (!formData.nomeResponsavel.trim()) return "Informe o nome do responsável legal.";
    if (!formData.telefoneContato.trim()) return "Informe o telefone de contato.";
    if (formData.telefoneContato.replace(/\D/g, "").length < 10)
      return "O telefone de contato está incompleto. Use o formato 16 12345-6789.";
    if (!formData.emailContato.trim()) return "Informe o e-mail de contato.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailContato.trim()))
      return "Informe um e-mail de contato válido.";
    if (!formData.cadastroUnico)
      return "Informe se a família é inclusa em algum serviço do Cadastro Único.";
    if (!formData.jaSeInscreveu)
      return "Informe se já se inscreveu anteriormente para vagas em nosso Grupo Escoteiro.";
    if (formData.jaSeInscreveu === "Outro" && !formData.jaSeInscreveuOutro.trim())
      return "Descreva a opção 'Outro' sobre inscrições anteriores.";
    if (!formData.motivoCadastro)
      return "Informe o principal motivo do cadastro de inscrição do jovem.";
    if (!formData.disponibilidadeResponsavel)
      return "Informe a disponibilidade do adulto responsável.";
    if (!formData.cienciaJovem)
      return "Informe se o jovem é favorável e ciente da entrada no Movimento Escoteiro.";
    if (!formData.familiarInscrito)
      return "Informe se há algum familiar próximo inscrito nesta Pré-inscrição.";
    if (formData.familiarInscrito === "Sim" && !formData.familiaresPreInscritos.trim())
      return "Informe o nome completo do familiar pré-inscrito e o grau de parentesco.";
    if (!formData.deficiencia) return "Informe se o jovem possui algum tipo de deficiência.";
    if (AVALIACAO_ITEMS.some((item) => !formData.avaliacaoJovem[item]))
      return "Classifique todas as questões da escala de 1 a 5 em relação ao jovem.";

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      await submitPreInscricaoForm({
        ...formData,
        // Campos condicionais não preenchidos não devem ser persistidos com lixo
        jaSeInscreveuOutro:
          formData.jaSeInscreveu === "Outro" ? formData.jaSeInscreveuOutro : "",
        familiaresPreInscritos:
          formData.familiarInscrito === "Sim" ? formData.familiaresPreInscritos : "",
        descricaoDeficiencia:
          formData.deficiencia === "Não possui deficiência"
            ? ""
            : formData.descricaoDeficiencia,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          Pré-inscrição enviada com sucesso!
        </h2>
        <p className="text-gray-600 mb-8">
          Recebemos os dados de <strong>{formData.nomeCompleto}</strong>. Entraremos em
          contato pelo telefone e e-mail informados assim que houver novidades sobre a vaga.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData(INITIAL_FORM_DATA);
            }}
            className="px-6 py-3 bg-[#FF654D] text-white font-semibold rounded-lg hover:bg-[#e0543c] transition-colors cursor-pointer"
          >
            Preencher outra pré-inscrição
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-10 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="border-b pb-6 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FF654D] mb-2">
          Pré-Inscrição para o Grupo Escoteiro Araraquara "José Luiz Torquato"
        </h1>
        <p className="text-gray-600 font-medium">2º Semestre 2026</p>
        <p className="text-sm text-gray-500 mt-2">
          Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r">
          <p className="font-semibold">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sobre as vagas */}
        <div className={SECTION_CLASS}>
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">Sobre as vagas</h2>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-700 space-y-3">
            <p className="italic">
              *ao preencher esse formulário você também autoriza entrar em nosso mailing
              (telefone e e-mail) para divulgação de informações e eventos do Grupo
              Escoteiro Araraquara.
            </p>
          </div>

          <div>
            <FieldLabel required>Sobre as vagas</FieldLabel>
            <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#FF654D] cursor-pointer transition-colors">
              <input
                type="radio"
                name="cienteAviso"
                checked={formData.cienteAviso}
                onChange={() => setField("cienteAviso", true)}
                className="w-4 h-4 mt-1 text-[#FF654D] focus:ring-[#FF654D]"
              />
              <span className="text-gray-800">
                Li e concordo com o aviso acima! Quero prosseguir com o cadastro.
              </span>
            </label>
          </div>
        </div>

        {/* Como conheceu o Movimento Escoteiro */}
        <div className={SECTION_CLASS}>
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Como nos conheceu
          </h2>

          <div>
            <FieldLabel required>Como conheceu o Movimento Escoteiro?</FieldLabel>
            <RadioGroup
              name="comoConheceu"
              options={COMO_CONHECEU_OPTIONS}
              value={formData.comoConheceu}
              onChange={(value) => setField("comoConheceu", value)}
            />
          </div>
        </div>

        {/* Tipo da vaga */}
        <div className={SECTION_CLASS}>
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">Tipo da vaga</h2>

          <div>
            <FieldLabel
              required
              hint={
                <>
                  <strong>Legenda: Lobinhos:</strong> de 7 a 10 anos;{" "}
                  <strong>Escoteiros:</strong> de 11 a 15 anos e <strong>Pioneiros:</strong>{" "}
                  de 18 a 22 anos
                </>
              }
            >
              O interesse para vaga é de
            </FieldLabel>
            <select
              name="tipoVaga"
              value={formData.tipoVaga}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            >
              <option value="">Escolher</option>
              {TIPO_VAGA_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cadastro da criança/jovem */}
        <div className={SECTION_CLASS}>
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            Cadastro da criança/jovens
          </h2>
          <p className="text-gray-600 -mt-4">
            Para jovens de 7 (completos na data de inscrição) à 22 anos
          </p>

          <div>
            <FieldLabel required hint="Coloque aqui a data de nascimento do JOVEM.">
              Data de Nascimento do Jovem
            </FieldLabel>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            />
            {idade !== null && (
              <p className="text-sm text-gray-600 mt-2">
                Idade na data de hoje: <strong>{idade} anos</strong>
              </p>
            )}
            {idadeForaDaFaixa && faixaVaga && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                Atenção: a vaga selecionada é para jovens de {faixaVaga[0]} a {faixaVaga[1]}{" "}
                anos. Confira a data de nascimento ou o tipo da vaga antes de enviar.
              </p>
            )}
          </div>

          <div>
            <FieldLabel required hint="Qual o nome completo do JOVEM?">
              Nome Completo
            </FieldLabel>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <FieldLabel required>Gênero do(a) jovem</FieldLabel>
            <RadioGroup
              name="genero"
              options={GENERO_OPTIONS}
              value={formData.genero}
              onChange={(value) => setField("genero", value)}
            />
          </div>

          <div>
            <FieldLabel required hint="Qual o nome do responsável legal pelo jovem?">
              Nome do responsável
            </FieldLabel>
            <input
              type="text"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel
                required
                hint="Qual o telefone para contato? De preferência número do WhatsApp do responsável em formato 16 12345-6789."
              >
                Telefone de contato
              </FieldLabel>
              <input
                type="tel"
                name="telefoneContato"
                value={formData.telefoneContato}
                onChange={(e) =>
                  setField("telefoneContato", formatarTelefone(e.target.value))
                }
                placeholder="16 12345-6789"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <FieldLabel hint="Insira outro telefone de contato, caso possua.">
                Telefone adicional do responsável
              </FieldLabel>
              <input
                type="tel"
                name="telefoneAdicional"
                value={formData.telefoneAdicional}
                onChange={(e) =>
                  setField("telefoneAdicional", formatarTelefone(e.target.value))
                }
                placeholder="16 12345-6789"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <FieldLabel required hint="Qual o e-mail do responsável legal pelo jovem?">
              E-mail de contato
            </FieldLabel>
            <input
              type="email"
              name="emailContato"
              value={formData.emailContato}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <FieldLabel required hint="Exemplo: Bolsa Família, Cidadania e outros.">
              A família é inclusa em algum serviço do Cadastro Único dos Programas Sociais do
              Governo?
            </FieldLabel>
            <RadioGroup
              name="cadastroUnico"
              options={CADASTRO_UNICO_OPTIONS}
              value={formData.cadastroUnico}
              onChange={(value) => setField("cadastroUnico", value)}
            />
          </div>

          <div>
            <FieldLabel required>
              Já se inscreveu anteriormente para vagas em nosso Grupo Escoteiro?
            </FieldLabel>
            <RadioGroup
              name="jaSeInscreveu"
              options={JA_SE_INSCREVEU_OPTIONS}
              value={formData.jaSeInscreveu}
              onChange={(value) => setField("jaSeInscreveu", value)}
            />
            {formData.jaSeInscreveu === "Outro" && (
              <input
                type="text"
                name="jaSeInscreveuOutro"
                value={formData.jaSeInscreveuOutro}
                onChange={handleInputChange}
                placeholder="Descreva"
                className={`${INPUT_CLASS} mt-3`}
              />
            )}
          </div>

          <div>
            <FieldLabel required>
              Qual o principal motivo do cadastro de inscrição do jovem?
            </FieldLabel>
            <RadioGroup
              name="motivoCadastro"
              options={MOTIVO_CADASTRO_OPTIONS}
              value={formData.motivoCadastro}
              onChange={(value) => setField("motivoCadastro", value)}
            />
          </div>

          <div>
            <FieldLabel required>
              O jovem entra, mas o adulto responsável entra junto. Qual a sua disponibilidade,
              em finais de semana, em ajudar em atividades específicas que for solicitado?
            </FieldLabel>
            <RadioGroup
              name="disponibilidadeResponsavel"
              options={DISPONIBILIDADE_RESPONSAVEL_OPTIONS}
              value={formData.disponibilidadeResponsavel}
              onChange={(value) => setField("disponibilidadeResponsavel", value)}
            />
          </div>

          <div>
            <FieldLabel required>
              O jovem é favorável e ciente da entrada no Movimento Escoteiro?
            </FieldLabel>
            <RadioGroup
              name="cienciaJovem"
              options={CIENCIA_JOVEM_OPTIONS}
              value={formData.cienciaJovem}
              onChange={(value) => setField("cienciaJovem", value)}
            />
          </div>

          <div>
            <FieldLabel>
              Você conhece alguém que já faz parte de nosso Grupo Escoteiro e que te orientou
              nesse processo de pré-inscrição? Escreva o nome do jovem ou voluntário.
            </FieldLabel>
            <input
              type="text"
              name="indicacaoGrupo"
              value={formData.indicacaoGrupo}
              onChange={handleInputChange}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <FieldLabel
              required
              hint="Familiares Próximos: Responsáveis legais ou irmãos"
            >
              Além deste(a) inscrito(a), há algum familiar próximo inscrito nessa
              Pré-inscrição, que também aguarda a vaga para este semestre?
            </FieldLabel>
            <RadioGroup
              name="familiarInscrito"
              options={["Sim", "Não"]}
              value={formData.familiarInscrito}
              onChange={(value) =>
                setField("familiarInscrito", value as PreInscricaoFormData["familiarInscrito"])
              }
            />
          </div>
        </div>

        {/* Inscrição familiar */}
        {formData.familiarInscrito === "Sim" && (
          <div className={SECTION_CLASS}>
            <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
              Inscrição familiar
            </h2>

            <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-700">
              <p>
                Essa informação <strong>sinaliza</strong> aos voluntários{" "}
                <strong>o interesse da família</strong> de que duas ou mais inscrições sejam
                atendidas nessa mesma chamada. No entanto, <u>não</u> serve de garantia, visto
                que devem atender a critérios de maior importância, já explicados anteriormente,
                para manter o equilíbrio das equipes.
              </p>
            </div>

            <div>
              <FieldLabel
                required
                hint="Escreva os nomes completos dos familiares pré-inscritos e, na frente, identifique se é irmão, irmã ou responsável legal do jovem que está se inscrevendo agora."
              >
                Nome(s) completo do familiar pré-inscrito e grau de parentesco
              </FieldLabel>
              <textarea
                name="familiaresPreInscritos"
                value={formData.familiaresPreInscritos}
                onChange={handleInputChange}
                rows={3}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        )}

        {/* Dados médicos */}
        <div className={SECTION_CLASS}>
          <h2 className="text-xl font-bold text-[#00337C] border-b pb-2">
            📋 Dados médicos
          </h2>

          <div>
            <FieldLabel required>O jovem possui algum tipo de deficiência?</FieldLabel>
            <RadioGroup
              name="deficiencia"
              options={DEFICIENCIA_OPTIONS}
              value={formData.deficiencia}
              onChange={(value) => setField("deficiencia", value)}
            />
          </div>

          {formData.deficiencia && formData.deficiencia !== "Não possui deficiência" && (
            <div>
              <FieldLabel>
                Caso o(a) jovem possua deficiência, por favor, a descreva melhor para nós:
              </FieldLabel>
              <textarea
                name="descricaoDeficiencia"
                value={formData.descricaoDeficiencia}
                onChange={handleInputChange}
                rows={3}
                className={INPUT_CLASS}
              />
            </div>
          )}

          <div>
            <FieldLabel required>
              Em relação ao jovem, de uma escala onde 1 é "não possui" e 5 é "possui muita",
              como você classifica as seguintes questões:
            </FieldLabel>

            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3"></th>
                    {[1, 2, 3, 4, 5].map((nota) => (
                      <th
                        key={nota}
                        className="p-3 text-center text-[#00337C] font-semibold w-14"
                      >
                        {nota}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AVALIACAO_ITEMS.map((item, index) => (
                    <tr
                      key={item}
                      className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
                    >
                      <td className="p-3 text-gray-800">{item}</td>
                      {[1, 2, 3, 4, 5].map((nota) => (
                        <td key={nota} className="p-3 text-center">
                          <input
                            type="radio"
                            name={`avaliacao-${index}`}
                            checked={formData.avaliacaoJovem[item] === nota}
                            onChange={() => handleAvaliacaoChange(item, nota)}
                            aria-label={`${item} - nota ${nota}`}
                            className="w-4 h-4 text-[#FF654D] focus:ring-[#FF654D] cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <FieldLabel hint="Adicione alguma informação complementar que julgar necessário. Conhece alguém do Movimento Escoteiro?">
              Observações gerais
            </FieldLabel>
            <textarea
              name="observacoesGerais"
              value={formData.observacoesGerais}
              onChange={handleInputChange}
              rows={3}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#FF654D] hover:bg-[#e0543c] text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Pré-Inscrição"}
        </button>
      </form>
    </div>
  );
}
