/* eslint-disable react/no-unescaped-entities */
const CookiePolicies = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <h1 className="text-orange-800 text-3xl font-bold mb-6">Politique de Cookies</h1>
      
      <p className="text-white  mb-4">
        Cette politique de cookies explique ce que sont les cookies, comment et pourquoi nous les utilisons, ainsi que vos droits à gérer vos préférences. En utilisant notre site Web, vous acceptez l'utilisation de cookies conformément à cette politique.
      </p>
      
      <h2 className="text-orange-800 text-xl font-semibold mt-6">Que sont les cookies ?</h2>
      <p className="text-white  mb-4">
        Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site Web. Ils sont largement utilisés pour permettre aux sites Web de fonctionner efficacement, améliorer l'expérience utilisateur et fournir des informations aux propriétaires du site.
      </p>
      
      <h2 className="text-orange-800 text-xl font-semibold mt-6">Quels types de cookies utilisons-nous ?</h2>
      <p className="text-white  mb-4">
        Nous utilisons différents types de cookies pour diverses raisons sur notre site Web. Voici une description des principaux types de cookies que nous utilisons :
      </p>
      
      <ul className="list-disc pl-6 mb-4">
        <li className="text-white  mb-2">
          <strong>Cookies essentiels :</strong> Ces cookies sont nécessaires pour que notre site fonctionne correctement. Ils permettent des fonctionnalités de base comme la navigation de page et l'accès aux zones sécurisées du site. Sans ces cookies, le site ne peut pas fonctionner correctement.
        </li>
        <li className="text-white  mb-2">
          <strong>Cookies de performance :</strong> Ces cookies collectent des informations sur la manière dont les visiteurs utilisent notre site, comme les pages les plus souvent visitées et les messages d'erreur éventuels. Ces cookies ne collectent pas d'informations qui identifient un visiteur spécifique. Toutes les informations recueillies par ces cookies sont agrégées et donc anonymes.
        </li>
        <li className="text-white  mb-2">
          <strong>Cookies de fonctionnalité :</strong> Ces cookies permettent à notre site de se souvenir des choix que vous faites (comme votre langue préférée ou la région dans laquelle vous vous trouvez) et de fournir des fonctionnalités améliorées et plus personnelles. Les informations collectées par ces cookies peuvent être anonymisées et ne peuvent pas suivre vos activités de navigation sur d'autres sites Web.
        </li>
        <li className="text-white  mb-2">
          <strong>Cookies de ciblage/publicité :</strong> Ces cookies sont utilisés pour diffuser des publicités qui sont pertinentes pour vous et vos centres d'intérêt. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et pour aider à mesurer l'efficacité des campagnes publicitaires. Ils sont généralement placés par des réseaux publicitaires avec la permission de l'opérateur du site Web.
        </li>
      </ul>

      <h2 className="text-orange-800 text-xl font-semibold mt-6">Comment utilisons-nous les cookies ?</h2>
      <p className="text-white  mb-4">
        Nous utilisons les cookies pour améliorer l'expérience utilisateur sur notre site, en personnalisant le contenu et les publicités, en offrant des fonctionnalités de réseaux sociaux, et en analysant notre trafic. Les cookies nous aident également à comprendre comment notre site est utilisé, ce qui nous permet d'améliorer continuellement nos services.
      </p>
      <p className="text-white  mb-4">
        Les cookies tiers que nous utilisons proviennent de partenaires avec lesquels nous travaillons pour vous offrir une meilleure expérience utilisateur, comme les services d'analyse, les plateformes publicitaires et les intégrations de réseaux sociaux. Ces tiers peuvent combiner les informations qu'ils collectent avec d'autres données que vous avez fournies ou qu'ils ont recueillies lorsque vous utilisez leurs services.
      </p>

      <h2 className="text-orange-800 text-xl font-semibold mt-6">Gestion des cookies et consentement</h2>
      <p className="text-white  mb-4">
        Vous avez le droit de décider si vous acceptez ou refusez les cookies. Vous pouvez modifier vos préférences en matière de cookies à tout moment en ajustant les paramètres de votre navigateur. Veuillez noter que si vous choisissez de bloquer certains cookies, cela peut affecter votre expérience sur notre site et certains services peuvent ne pas fonctionner correctement.
      </p>
      
      <h2 className="text-orange-800 text-xl font-semibold mt-6">Cookies utilisés sur notre site</h2>
      <p className="text-white  mb-4">
        Voici une liste des cookies spécifiques que nous utilisons sur notre site, avec des informations sur leur durée de vie et leur objectif. Cette liste peut être mise à jour régulièrement :
      </p>

      <table className="text-white table-auto w-full text-left border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nom du Cookie</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Durée</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">session_id</td>
            <td className="border border-gray-300 px-4 py-2">Essentiel</td>
            <td className="border border-gray-300 px-4 py-2">Session</td>
            <td className="border border-gray-300 px-4 py-2">Utilisé pour gérer la session utilisateur sur le site.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">analytics_cookie</td>
            <td className="border border-gray-300 px-4 py-2">Performance</td>
            <td className="border border-gray-300 px-4 py-2">2 ans</td>
            <td className="border border-gray-300 px-4 py-2">Utilisé pour collecter des informations anonymes sur les visites de notre site.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">advertising_cookie</td>
            <td className="border border-gray-300 px-4 py-2">Ciblage/Publicité</td>
            <td className="border border-gray-300 px-4 py-2">1 an</td>
            <td className="border border-gray-300 px-4 py-2">Utilisé pour diffuser des publicités personnalisées basées sur vos intérêts.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-orange-800 text-xl font-semibold mt-6">Modifications de cette politique</h2>
      <p className="text-white  mb-4">
        Nous pouvons mettre à jour cette politique de cookies de temps en temps afin de refléter, par exemple, les modifications apportées aux cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc la consulter régulièrement pour rester informé de notre utilisation des cookies et des technologies connexes.
      </p>

      <h2 className="text-orange-800 text-xl font-semibold mt-6">Contact</h2>
      <p className="text-white  mb-4">
        Si vous avez des questions concernant cette politique de cookies ou notre utilisation des cookies, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@votresite.com" className="text-blue-500 hover:underline">contact@votresite.com</a>.
      </p>
    </div>
  );
};

export default CookiePolicies;
