import                     "./ErrorPage.css";
import MainNavigation from "./MainNavigation";
import Footer         from "./Footer";
import { Link }       from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <MainNavigation />
      <main>
        <p>
          <Link to="/">Take me Home</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;