import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/errors";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: "" };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

const LoginScreen = () => {
  const { data: session } = useSession();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS" });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <form
      className="mx-auto max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-4 text-xl">Login</h1>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter valid email",
            },
          })}
          className="w-full h-12"
          id="email"
          autoFocus
        ></input>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 5,
              message: "password should be more than 4 chars",
            },
          })}
          className="w-full h-12"
          id="password"
          autoFocus
        ></input>
        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-4 ">
        <button className="primary-button">
          {!loading ? "Loading.." : "Login"}
        </button>
        {/* {!loading && <CircularProgress />} */}
      </div>
      <div className="mb-4 ">
        Don&apos;t have an account? &nbsp;
        <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
      </div>
    </form>
  );
};

export default LoginScreen;

// import React from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { Col, Row, Spin, Form, Input, Button, Checkbox, message } from "antd";
// import { ArrowRightOutlined } from "@ant-design/icons";

// import { useRouter } from "next/router";
// import withoutAuth from "../utils/withoutAuth";

// const Login = () => {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Head>
//         <title>Login - theBootStore</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="w-full p-4 px-4 lg:px-10">
//         <img src="" alt="" />
//       </div>

//       <div className="container w-full p-4 px-4 lg:px-10 mt-10">
//         <Row className="flex flex-col xl:flex-row">
//           <Col span={24} xl={10} className="p-4">
//             <h1 className="font-bold text-5xl uppercase">LOG IN</h1>
//             <Link href="/forgetpassword">
//               <p className="my-4 inline-block underline cursor-pointer">
//                 Forgotten Password?
//               </p>
//             </Link>
//             <Form
//               name="basic"
//               //onFinish={onFinish}
//               // onFinishFailed={onFinishFailed}
//               autoComplete="off"
//               size="large"
//             >
//               <Form.Item
//                 name="email"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Email!",
//                   },
//                 ]}
//               >
//                 <Input
//                   type="text"
//                   className="w-full border outline-none mt-4 p-4"
//                   placeholder="Enter Email Here..."
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Password!",
//                   },
//                 ]}
//               >
//                 <Input.Password
//                   className="w-full border outline-none mt-4 p-4"
//                   placeholder="Enter Password Here..."
//                 />
//               </Form.Item>
//               <button
//                 type="submit"
//                 className="border-2 cursor-pointer bg-black text-white py-4 px-6 mb-4 flex items-center uppercase font-bold mt-4"
//               >
//                 Log In &nbsp; <ArrowRightOutlined />
//               </button>
//             </Form>
//           </Col>
//           <Col span={24} xl={4}></Col>
//           <Col span={24} xl={10} className="p-4">
//             <h1 className="font-bold text-5xl uppercase">CREATE AN ACCOUNT</h1>
//             <Link href="/register">
//               <button className="border-2 cursor-pointer bg-black text-white py-4 px-6 mb-4 flex items-center uppercase font-bold mt-4">
//                 Register &nbsp; <ArrowRightOutlined />
//               </button>
//             </Link>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default withoutAuth(Login);
