import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText, Box, Typography } from '@mui/material';
import { YouthApplicationForm as YouthApplicationFormType, Branch, Section, FormStatus } from '../../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const branchSections: Record<Branch, Section[]> = {
  [Branch.FILHOTE]: [], // No sections for Filhote
  [Branch.LOBINHO]: [Section.ALCATEIA_MOGLI, Section.ALCATEIA_HATI],
  [Branch.ESCOTEIRO]: [Section.TROPA_CAIAPOS, Section.TROPA_XAVANTES, Section.TROPA_GUARANI],
  [Branch.SENIOR]: [Section.TROPA_SENIOR],
  [Branch.PIONEIRO]: [Section.CLA_GUARDIOS_DO_SOL],
};

const schema = yup.object().shape({
  memberName: yup.string().required('Nome do membro é obrigatório.'),
  age: yup.number().typeError('Idade deve ser um número.').required('Idade é obrigatória.').min(5).max(22),
  branch: yup.string().oneOf(Object.values(Branch)).required('Ramo é obrigatório.'),
  section: yup.string().oneOf(Object.values(Section)).required('Seção é obrigatória.'),
  cpf: yup.string().required('CPF é obrigatório.'),
  responsibleName: yup.string().when('branch', {
    is: (branch: Branch) => branch !== Branch.PIONEIRO,
    then: yup.string().required('Nome do responsável é obrigatório.'),
    otherwise: yup.string(),
  }),
  memberContact: yup.string().required('Contato do membro é obrigatório.'),
  responsibleContact: yup.string().when('branch', {
    is: (branch: Branch) => branch !== Branch.PIONEIRO,
    then: yup.string().required('Contato do responsável é obrigatório.'),
    otherwise: yup.string(),
  }),
});

const YouthApplicationForm = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<Omit<YouthApplicationFormType, 'id' | 'timestamp' | 'status'>>({
    resolver: yupResolver(schema),
  });

  const selectedBranch = watch('branch');

  const onSubmit = async (data: Omit<YouthApplicationFormType, 'id' | 'timestamp' | 'status'>) => {
    try {
      await addDoc(collection(db, 'youthApplications'), {
        ...data,
        status: FormStatus.PENDING,
        timestamp: serverTimestamp(),
      });
      alert('Inscrição enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
      alert('Ocorreu um erro ao enviar a inscrição.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Ficha de Inscrição - Jovem</Typography>

      <Controller
        name="memberName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Nome do Membro" fullWidth margin="normal" error={!!errors.memberName} helperText={errors.memberName?.message} />}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => <TextField {...field} label="Idade" type="number" fullWidth margin="normal" error={!!errors.age} helperText={errors.age?.message} />}
      />

      <FormControl fullWidth margin="normal" error={!!errors.branch}>
        <InputLabel>Ramo</InputLabel>
        <Controller
          name="branch"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Ramo">
              {Object.values(Branch).map((branch) => (
                <MenuItem key={branch} value={branch}>{branch}</MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.branch?.message}</FormHelperText>
      </FormControl>

      {selectedBranch && branchSections[selectedBranch].length > 0 && (
        <FormControl fullWidth margin="normal" error={!!errors.section}>
          <InputLabel>Seção</InputLabel>
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Seção">
                {branchSections[selectedBranch].map((section) => (
                  <MenuItem key={section} value={section}>{section}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.section?.message}</FormHelperText>
        </FormControl>
      )}

      <Controller
        name="cpf"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="CPF" fullWidth margin="normal" error={!!errors.cpf} helperText={errors.cpf?.message} />}
      />

      <Controller
        name="responsibleName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Nome do Responsável" fullWidth margin="normal" error={!!errors.responsibleName} helperText={errors.responsibleName?.message} disabled={selectedBranch === Branch.PIONEIRO} />}
      />

      <Controller
        name="memberContact"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Contato do Membro" fullWidth margin="normal" error={!!errors.memberContact} helperText={errors.memberContact?.message} />}
      />

      <Controller
        name="responsibleContact"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Contato do Responsável" fullWidth margin="normal" error={!!errors.responsibleContact} helperText={errors.responsibleContact?.message} disabled={selectedBranch === Branch.PIONEIRO} />}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Enviar Inscrição
      </Button>
    </Box>
  );
};

export default YouthApplicationForm;