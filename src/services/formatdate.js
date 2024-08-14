// Fonction pour formater la date en français
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleString('fr-FR', options);
  };

  export default formatDate;