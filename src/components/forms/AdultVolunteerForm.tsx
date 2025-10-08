import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AdultVolunteerForm as AdultVolunteerFormType, AdultVolunteerRole, Section, DirigenteArea, FormStatus } from '../../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const allSections = Object.values(Section);
const allDirigenteAreas = Object.values(DirigenteArea);

const schema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório.'),
  age: yup.number().typeError('Idade deve ser um número.').required('Idade é obrigatória.').min(18, 'A idade mínima para voluntários é 18 anos.'),
  desiredRole: yup.string().oneOf(Object.values(AdultVolunteerRole)).required('Função desejada é obrigatória.'),
  section: yup.string().when('desiredRole', {
    is: AdultVolunteerRole.ESCOTISTA,
    then: yup.string().oneOf(allSections).required('A seção é obrigatória para escotistas.'),
    otherwise: yup.string().notRequired(),
  }),
  area: yup.string().when('desiredRole', {
    is: AdultVolunteerRole.DIRIGENTE,
    then: yup.string().oneOf(allDirigenteAreas).required('A área de atuação é obrigatória para dirigentes.'),
    otherwise: yup.string().notRequired(),
  }),
});

const AdultVolunteerForm = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<Omit<AdultVolunteerFormType, 'id' | 'timestamp' | 'status'>>({
    resolver: yupResolver(schema),
  });

  const desiredRole = watch('desiredRole');

  const onSubmit = async (data: Omit<AdultVolunteerFormType, 'id' | 'timestamp' | 'status'>) => {
    try {
      await addDoc(collection(db, 'adultVolunteerApplications'), {
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
      <Typography variant="h5" gutterBottom>Ficha de Inscrição - Adulto Voluntário</Typography>

      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Nome Completo" fullWidth margin="normal" error={!!errors.fullName} helperText={errors.fullName?.message} />}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => <TextField {...field} label="Idade" type="number" fullWidth margin="normal" error={!!errors.age} helperText={errors.age?.message} />}
      />

      <FormControl component="fieldset" margin="normal">
        <Typography component="legend">Função Desejada</Typography>
        <Controller
          name="desiredRole"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value={AdultVolunteerRole.ESCOTISTA} control={<Radio />} label="Escotista (Chefe Assistente)" />
              <FormControlLabel value={AdultVolunteerRole.DIRIGENTE} control={<Radio />} label="Dirigente (Apoio)" />
            </RadioGroup>
          )}
        />
        {errors.desiredRole && <FormHelperText error>{errors.desiredRole.message}</FormHelperText>}
      </FormControl>

      {desiredRole === AdultVolunteerRole.ESCOTISTA && (
        <FormControl fullWidth margin="normal" error={!!errors.section}>
          <InputLabel>Seção de Preferência</InputLabel>
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Seção de Preferência">
                {allSections.map((section) => (
                  <MenuItem key={section} value={section}>{section}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.section?.message}</FormHelperText>
        </FormControl>
      )}

      {desiredRole === AdultVolunteerRole.DIRIGENTE && (
        <FormControl fullWidth margin="normal" error={!!errors.area}>
          <InputLabel>Área de Atuação</InputLabel>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Área de Atuação">
                {allDirigenteAreas.map((area) => (
                  <MenuItem key={area} value={area}>{area}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.area?.message}</FormHelperText>
        </FormControl>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Enviar Inscrição
      </Button>
    </Box>
  );
};

export default AdultVolunteerForm;