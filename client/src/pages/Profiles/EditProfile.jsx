import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "./ProfileForm";
import Spinner from "../../components/Spinner";
import { fetchMyProfile } from "../../slices/profiles";

function EditProfile() {
    const { profile, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch(); // uses useCallback

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    console.log({ profile });
    return <ProfileForm edit={true} initialValues={profile} />;
}

export default EditProfile;
