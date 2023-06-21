import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


const _apiUrl = "https://localhost:7218/api"
//check our PAO to ensure the firebase user that was just logged exists in our local SQL database
const doesUserExist = (navigate) => {

    return getToken()
    .then((token) => fetch(`${_apiUrl}/user/user`, {
        method: "GET",
        headers : {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
         return (response.ok)
    } ))

}

//extract the token from firebase response and return it here
export const getToken = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("Connot get current user. Did you forget to login?")
    }
    return currentUser.getIdToken();
};
//was out of scope
const userAuth = {};

export const emailAuth = {
    // Register New User
    register: function (userObj, navigate) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
            .then((userCredential) => {
                userAuth.email = userCredential.user.email;
                userAuth.firebasekey = userCredential.user.firebasekey;

                userAuth.uid = userCredential.user.uid;
                userAuth.type = "email";
                doesUserExist(userCredential.user.uid)
                    .then((userExists) => {
                        if (!userExists) {
                            navigate("/register")
                        } else {
                            localStorage.setItem("capstone_user", JSON.stringify(userAuth));
                            navigate("/letter/list")
                        }
                    })
            }
            )
            .catch((error) => {
                console.log("Email Register Error");
                console.log("error code", error.code);
                console.log("error message", error.message);
            });
    },

    // Sign in existing user
    signIn: function (userObj, navigate) {
        return new Promise((res) => {
            const auth = getAuth();
            const existingUser = {};
            signInWithEmailAndPassword(auth, userObj.email, userObj.password)
                .then((signInResponse) => {
                    existingUser.email = signInResponse.user.email;
                    existingUser.accessToken = signInResponse.user.accessToken;
                    existingUser.type = "email";
                    doesUserExist(signInResponse.user.uid)
                        .then((userExists) => {
                            if (!userExists) {
                                navigate("/register")
                            } else {
                                // Saves the user to localstorage
                                localStorage.setItem("capstone_user", JSON.stringify(existingUser));
                                // Navigate us back to home
                                console.log(existingUser + "Signed In")
                                navigate("/letter/list");
                            }
                        })

                    // Saves the user to localstorage
                    // localStorage.setItem("user", JSON.stringify(userAuth));
                    // Navigate us back to home
                    // navigate("/");
                })
                .catch((error) => {
                    console.log("Email SignIn Error");
                    console.log("error code", error.code);
                    console.log("error message", error.message);
                });
        });
    },
    // Sign out
    signOut: function (navigate) {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Remove the user from localstorage
                localStorage.removeItem("capstone_user");
                // Navigate us back to home
                navigate("/");
                console.log("Sign Out Success!");
            })
            .catch((error) => {
                console.log("signOut Error");
                console.log("error code", error.code);
                console.log("error message", error.message);
            });
    },
};