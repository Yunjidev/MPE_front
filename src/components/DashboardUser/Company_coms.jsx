/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";

const CommentsOfUser = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchCommentsAndOffers = async () => {
            try {
                const userProfile = await getData("user/profile");
                console.log('Fetched userProfile:', userProfile); // Vérifiez la réponse

                const ratings = userProfile.ratings || [];
                
                // Mettez à jour les réservations avec les offres imbriquées
                setReservations(ratings.map(rating => ({
                    ...rating,
                    offer: userProfile.reservations.find(reservation => reservation.Offer_id === rating.Offer_id)?.offer || {}
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCommentsAndOffers();
    }, []);

    return (
        <div>
            <h2>Commentaires de l'utilisateur</h2>
            {reservations.length === 0 ? (
                <p>Aucun commentaire trouvé.</p>
            ) : (
                reservations.map((reservation) => (
                    <div key={reservation.id} className="comment">
                        <p><strong>Offre : {reservation.offer.name || "Offre inconnue"}</strong></p>
                        <p>Note : {reservation.note}</p>
                        <p>Commentaire : {reservation.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentsOfUser;
