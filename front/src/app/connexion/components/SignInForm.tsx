import { ButtonForm, InputForm } from '../../ui';

export default function SignInForm() {
  return (
    <form className="flex flex-col w-80 mx-auto mt-40">
      <div className="flex flex-col gap-2">
        <div>
          <InputForm
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <InputForm
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
          </div>
          <ButtonForm
            text="Se connecter"
            style="dark"
          />
        </div>
      </div>
    </form>
  );
}
