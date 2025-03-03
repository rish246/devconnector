import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { fetchMyProfile } from "../../slices/profiles";
import Card from "../../components/Card/Card";

const ProfileCard = ({ className }) => {
    const user = useSelector((state) => state.auth.user);
    const { profile, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (!profile) {
        return <div>Nothing</div>;
    }

    return (
        <Card className={className}>
            <div className="banner-profile-card bg-blue-200 h-[40%] w-[100%]">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto"
                />
            </div>

            <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="te</div>xt-gray-600 text-sm">
                    {profile.status} @ {profile.company}
                </p>
            </div>
        </Card>
    );
};

export default ProfileCard;
