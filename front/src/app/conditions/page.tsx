'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2">
            <div className="relative w-25 h-10">
              <Image
                src="/glims-logo-filed-with-text.svg"
                alt="Logo Glims"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 border-slate-200 text-slate-700 rounded-lg border 
                          hover:text-orange-600 hover:bg-red-50 hover:border-red-100 transition cursor-pointer">
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Retour</span>
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-sm sm:prose max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
            Conditions d&apos;Utilisation
          </h1>

          <p className="text-slate-600 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Acceptation des Conditions
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              En accédant à et en utilisant Glims (« Service »), vous acceptez
              d&apos;être lié par ces Conditions d&apos;Utilisation. Si vous
              n&apos;acceptez pas l&apos;une quelconque de ces conditions,
              veuillez ne pas utiliser ce Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Licence d&apos;Utilisation
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous vous accordons une licence limitée, non-exclusive,
              non-transférable et révocable pour accéder et utiliser Glims
              conformément à ces Conditions. Vous ne pouvez pas reproduire,
              modifier, distribuer, afficher publiquement ou exploiter le
              Service ou son contenu à d&apos;autres fins sans notre
              consentement préalable écrit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Comptes Utilisateur
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Lorsque vous créez un compte Glims, vous êtes responsable du
              maintien de la confidentialité de votre mot de passe et des
              informations de compte. Vous acceptez d&apos;être responsable de
              toutes les activités qui se produisent sous votre compte.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous devez fournir des informations exactes, actuelles et
              complètes lors de l&apos;enregistrement et maintenir à jour ces
              informations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Contenu Utilisateur
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le Service vous permet de télécharger, d&apos;afficher et de
              partager du contenu (images, vidéos, etc.). En téléchargeant du
              contenu, vous déclarez et garantissez que :
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
              <li>Vous possédez ou contrôlez tous les droits sur le contenu</li>
              <li>
                Le contenu ne viole pas les droits de tiers (droits
                d&apos;auteur, marques, etc.)
              </li>
              <li>
                Le contenu n&apos;est pas illégal, offensant, diffamatoire,
                harcèlant ou sexuellement explicite
              </li>
              <li>
                Le contenu ne contient pas de virus ou de code malveillant
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous réservons le droit de supprimer tout contenu qui viole
              ces conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Droits de Propriété Intellectuelle
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Glims et son contenu original (à l&apos;exclusion du contenu
              utilisateur) sont la propriété exclusive de Glims et sont protégés
              par les droits d&apos;auteur et autres lois sur la propriété
              intellectuelle.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous conservez tous les droits sur votre contenu utilisateur. En
              téléchargeant du contenu, vous nous accordez une licence pour
              utiliser, afficher et distribuer ce contenu aux fins de
              fonctionnement du Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Comportement de l&apos;Utilisateur
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous acceptez de ne pas :
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
              <li>Utiliser le Service à des fins illégales</li>
              <li>Harceler, menacer ou abuser d&apos;autres utilisateurs</li>
              <li>Contourner les mesures de sécurité du Service</li>
              <li>Collecter ou accumuler des données sans permission</li>
              <li>Utiliser le Service pour la fraude ou le phishing</li>
              <li>Charger des virus ou des logiciels malveillants</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Limitation de Responsabilité
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Glims est fourni « tel quel » sans garantie d&apos;aucune sorte.
              Nous ne garantissons pas que le Service sera sans erreurs,
              ininterrompu ou sûr.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Dans la mesure maximale permise par la loi, Glims ne sera pas
              responsable des dommages indirects, accessoires, spéciaux ou
              consécutifs découlant de votre utilisation du Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Indemnisation
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous acceptez d&apos;indemniser et de dégager de toute
              responsabilité Glims et ses dirigeants, directeurs, employés et
              agents de toute réclamation, demande, dommage ou responsabilité
              découlant de votre utilisation du Service ou de votre violation de
              ces Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Suspension et Résiliation
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous réservons le droit de suspendre ou de résilier votre
              compte à tout moment sans préavis si vous violez ces Conditions ou
              si nous soupçonnons une activité frauduleuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Modifications des Conditions
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous réservons le droit de modifier ces Conditions à tout
              moment. Les modifications entreront en vigueur immédiatement après
              leur publication. Votre utilisation continue de Glims après de
              telles modifications implique votre acceptation des Conditions
              modifiées.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Loi Applicable
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Ces Conditions sont régies par et construites conformément aux
              lois applicables. Tout litige découlant de ou se rapportant à ces
              Conditions sera soumis à la juridiction exclusive des tribunaux
              compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Nous Contacter
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Si vous avez des questions concernant ces Conditions
              d&apos;Utilisation, veuillez nous contacter à :
            </p>
            <p className="text-slate-700">
              Email : legal@glims.app
              <br />
              Support : support@glims.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
