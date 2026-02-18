import { ControlledInputForm } from '../..';

interface FormValues {
  name: string;
  description?: string;
}

const GlimsInfoStep = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Créer un Glims</h2>

      <ControlledInputForm
        label="Nom du Glims"
        name="name"
        type="text"
        placeholder="Le nom du Glims"
        required={true}
      />
      <ControlledInputForm
        label="Description (facultatif)"
        name="description"
        type="text"
        placeholder="Ajoutez une description"
        required={false}
      />
    </>
  );
};

export default GlimsInfoStep;
