export default function Checkboxes() {
  return (
    <>
      <label
        className="flex items-center space-x-2"
        aria-label="Conditions d'utilisations">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer"
          required
        />
        <p className="text-gray-400 text-sm">
          J’accepte les{' '}
          <span className="text-blue-600 underline">
            conditions d’utilisations
          </span>
        </p>
      </label>
      <label
        className="flex items-center space-x-2"
        aria-label="Enregistrer mon mot de passe">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer"
        />
        <p className="text-gray-400 text-sm">Enregistrer mon mot de passe</p>
      </label>
    </>
  );
}
