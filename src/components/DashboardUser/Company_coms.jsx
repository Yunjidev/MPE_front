import React, { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";

const CommentsOfUser = () => {
    const [reservations, setReservations] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchCommentsAndOffers = async () => {
            try {
                const userProfile = await getData("user/profile");
                console.log('Fetched userProfile:', userProfile); // Vérifiez la réponse

                const ratings = userProfile.ratings || [];
                const offersData = userProfile.offers || [];

                setReservations(ratings);
                setOffers(offersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCommentsAndOffers();
    }, []);

    const getOfferName = (offerId) => {
        if (!offers) {
            return "Offre inconnue";
        }
        const offer = offers.find((offer) => offer.id === offerId);
        return offer ? offer.name : "Offre inconnue";
    };

    return (
        <div>
            <h2>Commentaires de l'utilisateur</h2>
            {reservations.length === 0 ? (
                <p>Aucun commentaire trouvé.</p>
            ) : (
                reservations.map((reservation) => (
                    <div key={reservation.id} className="comment">
                        <p><strong>Offre : {getOfferName(reservation.Offer_id)}</strong></p>
                        <p>Note : {reservation.note}</p>
                        <p>Commentaire : {reservation.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentsOfUser;
