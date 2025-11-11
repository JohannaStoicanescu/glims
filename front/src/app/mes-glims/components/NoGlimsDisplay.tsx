import { ButtonForm, InputForm } from '@/app/ui';
import { ChevronRight } from 'lucide-react';

export default function NoGlimsDisplay() {
  return (
    <>
      {/* DESKTOP DISPLAY */}
      <div className="space-y-5 hidden md:block">
        {/* WELCOME BANNER */}
        <div className="w-full flex justify-center bg-red-50 border border-red-100 rounded-2xl py-10">
          <div className="flex flex-col justify-center">
            <h3 className="text-5xl font-bold mb-3">Bienvenue sur Glims !</h3>
            <div className="text-gray-500 text-lg">
              <p>Les images que vous ajouterez apparaitrons ici.</p>
              <p>Ajoutez des images et des vidéos dès maintenant !</p>
            </div>
          </div>
          {/* TODO: Add video or image when example is ready, css will need to be updated */}
          {/* <div className="flex justify-center items-center h-56">
        </div> */}
        </div>

        <div className="flex gap-5">
          {/* CREATE FIRST GLIM BANNER */}
          <div className="w-7/12 bg-gray-50 border border-gray-200 rounded-2xl px-7 py-12 flex flex-col justify-center items-center">
            <div className="inline">
              <h3 className="text-2xl font-bold mb-4">
                Créer mon premier glim
              </h3>
              <button
                className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl cursor-pointer transition-all
            text-white bg-black border border-black hover:bg-white hover:text-black">
                Commencer
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* JOIN GLIM BANNER */}
          <div className="w-5/12 flex flex-col justify-center items-center bg-gray-50 border border-gray-200 rounded-2xl px-7 py-12">
            <h3 className="text-2xl font-bold mb-4">Rejoindre un glim</h3>
            <div className="gap-2 flex flex-col">
              <InputForm
                type="number"
                name="code"
                placeholder="Code à 6 chiffres"
              />
              <ButtonForm
                text="Rejoindre"
                style="dark"
                iconPosition="right"
                icon={<ChevronRight className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DISPLAY */}
      <div className="flex md:hidden flex-col h-full">
        {/* WELCOME BANNER */}
        <div className="w-full flex justify-center bg-red-50 border border-red-100 rounded-2xl py-10 px-2">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Bienvenue sur Glims !
            </h3>
            <div className="text-gray-500 text-sm">
              <p>Les images que vous ajouterez apparaitrons ici.</p>
              <p>Ajoutez des images et des vidéos dès maintenant !</p>
            </div>
          </div>
        </div>

        {/* CREATE FIRST GLIM OR JOIN GLIM */}
        <div className="space-y-2 flex flex-col justify-center items-center pb-4">
          <button
            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl cursor-pointer transition-all
            text-white bg-black border border-black focus:bg-white focus:text-black">
            Créer mon premier glim
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-gray-500 
          focus:text-black cursor-pointer transition-all">
            Rejoindre un glim
          </button>
        </div>
      </div>
    </>
  );
}
