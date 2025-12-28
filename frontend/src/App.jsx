import "./App.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
    <h1>Welcome to the App</h1>
      <header>
      <SignedOut>
        <SignInButton mode="modal"/>
        <button>Sign In</button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  );
}

export default App;
