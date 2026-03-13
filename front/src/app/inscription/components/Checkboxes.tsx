export default function Checkboxes() {
  return (
    <>
      <label
        htmlFor="terms-checkbox"
        className="flex items-center space-x-2 cursor-pointer">
        <input
          id="terms-checkbox"
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
        htmlFor="remember-password-checkbox"
        className="flex items-center space-x-2 cursor-pointer">
        <input
          id="remember-password-checkbox"
          type="checkbox"
          className="h-4 w-4 cursor-pointer"
        />
        <p className="text-gray-400 text-sm">Enregistrer mon mot de passe</p>
      </label>
    </>
  );
}
