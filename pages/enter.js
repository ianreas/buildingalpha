import { UserContext } from "../lib/context";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import debounce from "lodash.debounce";
import Link from "next/link";
import { doc, writeBatch, getDoc, getFirestore } from "firebase/firestore";
import { SlUser } from "react-icons/sl";
import { AiFillGoogleCircle, AiOutlineGoogle} from "react-icons/ai";

export default function Enter() {
  const { user, username } = useContext(UserContext);

  if (user) {
    console.log(user);
  }
  console.log(user);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <div className={user ? "signout-page" : "signin-page"}>
      {/* user ? !username ? <UsernameForm /> : <SignOut /> : <SignInForm/> */}
      {username ? <SignOut /> : <SignInForm />}
    </div>
  );
}

function SignInButton() {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="signIn-buttons-wrapper">
      <div className="signIn-buttons">
        <button className="btn-google" onClick={signInWithGoogle}>
          <p>Sign in with Google</p>
        </button>
        <button onClick={() => signInAnonymously(auth)}>
          <p>Sign in Anonymously</p>
        </button>
      </div>
    </div>
  );
}

function SignInForm() {
  const provider = new GoogleAuthProvider();

  const [authActivate, setAuthActivate] = useState(false);

  function clickAnon() {
    signInAnonymously(auth);
    setAuthActivate(true);
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by user"); // You can remove this line; it's just for your own debugging purposes
        // Handle the event quietly without disturbing the user. Maybe just log it for your own records.
      } else {
        console.error("Authentication error:", error);
      }
    }
  };

  return (
    <div className="signIn-buttons-wrapper">
      <div className="signIn-buttons">
        
        {authActivate ? (
          <div className='userform-anon-signin'>
            <h2 style={{ fontSize: "1.2rem", padding: "10px", color: "white" }}>Sign in Anonymously</h2>
            <UsernameForm />
          </div>
        ) : (
          <div>
          <h1 style={{ fontSize: "1.2rem", padding: "10px", color: "white", textAlign: 'center' }}>
          Sign In
        </h1>
          <button className="btn-google" onClick={() => clickAnon()}>
            <div className="anon-icon-container">
              <SlUser style={{ marginRight: "0px" }} />
            </div>
            <div className='anon-text-container'>Sign In Anonymously</div>
          </button>
          </div>
        )}
        <h3 style={{ fontSize: "1.2rem", padding: "10px", color: "white" }}>
          Or
        </h3>
        <div>
          <button className="btn-google" onClick={signInWithGoogle}>
          <div className="anon-icon-container">
              <AiOutlineGoogle style={{ marginRight: "0px" }} />
            </div>
            <div className='anon-text-container'>Sign In With Google</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <div className="btn-signout-wrapper">
      <button className="btn-signout" onClick={() => signOut(auth)}>
        Sign Out
      </button>{" "}
      {/*sign out button and upon pressing it it triggers the signout method*/}
    </div>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState(""); //the letters that the user is typing
  const [isValid, setIsValid] = useState(false); //this will tell us whether or not the username chosen is a valid selection
  const [loading, setLoading] = useState(false); //loading will be true while we are async checking whether or not the suername exists

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault(); //prevents the default behavior which is to refresh the page

    // Create refs for both documents
    const userDoc = doc(getFirestore(), "users", user.uid); //user.uid uses the current users user id
    const usernameDoc = doc(getFirestore(), "usernames", formValue); //formValue is what the user typed

    // Commit both docs together as a batch write. committing means adding these documents
    const batch = writeBatch(getFirestore()); //we want both user and username succeeed or fail as a transcation we we set up a batch
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit(); //commiting this write to the firestore
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    //this useEffect is checking the entire username typed and accessing the database to check if its taken
    checkUsername(formValue);
  }, [formValue]); //anytime the value typed in the Form is changed it will run the useEffect

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    //useCallback allows for this function to be memoized so it can be debounced between the state changes
    debounce(async (username) => {
      //debounce prevents the execution of the function until the last event has fired or until if 500 ms passed
      if (username.length >= 3) {
        //if the length is more than 3 then this needs to be checked against the database
        const ref = doc(getFirestore(), "usernames", username); //we make a reference to the location of the username document
        const snap = await getDoc(ref); //checks if exists
        console.log("Firestore read executed!", snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <div className="pick-username-wrapper">
        <section className="pick-username">
          <h3 style={{ padding: "10px", color: "white" }}>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input
              name="username"
              placeholder="myname"
              value={formValue}
              onChange={onChange}
              className="anon-sign-in-input"
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <button type="submit" className={isValid ? 'choosebutton' : 'choosebuttondisabled'} disabled={!isValid} >
              Choose
            </button>
          </form>
        </section>
      </div>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
