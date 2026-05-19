import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import loginIllustration from "../assets/login_illustration.png";
import logosaarthi from "../assets/logosaarthi.png";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const token =
      sessionStorage.getItem(
        "token"
      );

    if (token) {
      navigate("/dashboard");
    }

  }, []);

  const handleLogin =
    async () => {

      if (
        !email ||
        !password
      ) {

        setError(
          "All fields are required"
        );

        return;
      }

      try {

        setLoading(true);

        setError("");

        const res =
          await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email,
                  password,
                }),
            }
          );

        const data =
          await res.json();

        if (
          !res.ok
        ) {

          setError(
            data.message
          );

          setLoading(
            false
          );

          return;
        }

        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        navigate(
          "/dashboard"
        );

      } catch {

        setError(
          "Server error"
        );

      } finally {

        setLoading(
          false
        );
      }

    };

  return (

    <div className="
      min-h-screen
      bg-slate-950
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-5xl
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
        shadow-2xl
        grid
        md:grid-cols-2
      ">

        {/* LEFT */}

        <div className="
          hidden
          md:flex
          flex-col
          justify-center
          bg-indigo-600
          p-12
          text-white
          relative
          overflow-hidden
        ">

          <div className="
            absolute
            inset-0
            opacity-40
            mix-blend-overlay
          ">

            <img
              src={loginIllustration}
              alt="Dashboard"
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>

          <div className="
            absolute
            w-96
            h-96
            bg-white/10
            rounded-full
            -top-32
            -left-32
            blur-3xl
          "></div>

          <div className="
            absolute
            w-80
            h-80
            bg-white/10
            rounded-full
            -bottom-32
            -right-20
            blur-3xl
          "></div>

          <div className="
            relative
            z-10
          ">

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">

              <div className="
                w-16
                h-16
                rounded-2xl
                bg-white
                p-2
                flex
                items-center
                justify-center
                shadow-lg
              ">

                <img
                  src={logosaarthi}
                  alt="VYAPARsaarthi Logo"
                  className="
                    w-full
                    h-full
                    object-contain
                  "
                />

              </div>

              <div>

                <h1 className="
                  text-4xl
                  font-bold
                ">
                  VYAPARsaarthi
                </h1>

                <p className="
                  text-indigo-100
                  mt-1
                ">
                  AI-powered merchant companion
                </p>

              </div>

            </div>

            <p className="
              text-indigo-100
              leading-7
              max-w-sm
            ">
              Helping merchants analyze,
              improve, and optimize
              AI visibility across their
              Shopify products.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="
          p-8
          md:p-12
          flex
          flex-col
          justify-center
        ">

          <h2 className="
            text-3xl
            font-bold
            text-white
            mb-2
          ">
            Merchant Login
          </h2>

          <p className="
            text-slate-400
            mb-8
          ">
            Access your AI-powered
            merchant dashboard
          </p>

          {error && (

            <div className="
              mb-4
              bg-red-500/10
              border
              border-red-500/30
              text-red-400
              text-sm
              rounded-xl
              px-4
              py-3
            ">

              {error}

            </div>

          )}

          <div className="
            space-y-5
          ">

            <div>

              <label className="
                text-sm
                text-slate-300
                block
                mb-2
              ">
                Store Email
              </label>

              <input
                type="email"
                placeholder="merchant@store.com"
                value={email}
                onChange={(e)=>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />

            </div>

            <div>

              <label className="
                text-sm
                text-slate-300
                block
                mb-2
              ">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />

            </div>

          </div>

          <button
            onClick={
              handleLogin
            }
            disabled={
              loading
            }
            className="
              w-full
              mt-6
              bg-indigo-600
              hover:bg-indigo-500
              transition-all
              text-white
              py-3
              rounded-xl
              font-semibold
              shadow-lg
              shadow-indigo-600/20
            "
          >

            {
              loading
              ? "Logging in..."
              : "Access Dashboard"
            }

          </button>

        </div>

      </div>

    </div>
  );
}