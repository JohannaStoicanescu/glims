'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
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

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-sm sm:prose max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
            Politique de Confidentialité
          </h1>

          <p className="text-slate-600 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Glims (« nous », « nos », « notre ») exploite le site web et
              l&apos;application mobile Glims. Cette page vous informe de nos
              politiques concernant la collecte, l&apos;utilisation et la
              divulgation de données personnelles lorsque vous utilisez notre
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Collecte et Utilisation des Données
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous collectons plusieurs types de données à des fins différentes
              pour vous fournir un meilleur service.
            </p>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Types de données collectées :
            </h3>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
              <li>
                <strong>Données de compte :</strong> nom, adresse e-mail, photo
                de profil
              </li>
              <li>
                <strong>Données d&apos;utilisation :</strong> pages consultées,
                actions effectuées, temps d&apos;utilisation
              </li>
              <li>
                <strong>Contenu :</strong> images, vidéos et métadonnées que
                vous téléchargez
              </li>
              <li>
                <strong>Données techniques :</strong> adresse IP, type de
                navigateur, système d&apos;exploitation
              </li>
              <li>
                <strong>Données de cookie :</strong> pour améliorer votre
                expérience utilisateur
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Utilisation des Données
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Glims utilise les données collectées à diverses fins :
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
              <li>Fournir, exploiter et maintenir notre Service</li>
              <li>Améliorer, personnaliser et étendre notre Service</li>
              <li>
                Comprendre et analyser comment vous utilisez notre Service
              </li>
              <li>
                Développer de nouveaux produits, services, caractéristiques et
                fonctionnalités
              </li>
              <li>
                Communiquer avec vous, notamment pour les mises à jour de
                service
              </li>
              <li>
                Détecter, prévenir et résoudre les problèmes techniques et les
                fraudes
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Sécurité des Données
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              La sécurité de vos données est importante pour nous. Nous
              utilisons des mesures de sécurité appropriées pour protéger vos
              données personnelles contre l&apos;accès, la modification, la
              divulgation ou la destruction non autorisés. Cependant, aucune
              méthode de transmission sur Internet ou de stockage électronique
              n&apos;est 100% sécurisée.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Partage des Données
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous ne vendons, n&apos;échangeons et ne transférons jamais vos
              données personnelles identifiables à des tiers sans votre
              consentement, sauf si la loi l&apos;exige.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous pouvons partager des données non-identifiables avec des
              partenaires, des annonceurs et d&apos;autres tiers à des fins de
              marketing, de publicité et d&apos;analyse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Vos Droits
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous avez le droit de :
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
              <li>Accéder à vos données personnelles</li>
              <li>Corriger les données inexactes</li>
              <li>Supprimer vos données</li>
              <li>Vous opposer au traitement de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour exercer ces droits, veuillez nous contacter à
              privacy@glims.app
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Modifications de cette Politique
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous réservons le droit de modifier cette Politique de
              Confidentialité à tout moment. Les modifications entreront en
              vigueur immédiatement après leur publication sur cette page. Votre
              utilisation continue de Glims après de telles modifications
              implique votre acceptation de la Politique modifiée.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Nous Contacter
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Si vous avez des questions concernant cette Politique de
              Confidentialité, veuillez nous contacter à :
            </p>
            <p className="text-slate-700">
              Email : privacy@glims.app
              <br />
              Support : support@glims.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
