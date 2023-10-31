import { Product } from "data/schema.js";
import { useEffect, useState } from "react";

{
  const { ipcRenderer } = window.electron;

  (async () => {
    const products: Product[] = await ipcRenderer.invoke("db:getAllProducts");
    console.log({ products });
  })();

  (async () => {
    const res = await ipcRenderer.invoke("DELETEME");
    console.log({ res });
  })();
}

export default function App() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const { ipcRenderer } = window.electron;
      const base64 = await ipcRenderer.invoke(
        "fs:getImgAsBase64",
        "./data/images/SMGRGRPQEGR156582452884AL.png", // Format the same as db file finding
      );
      setImgSrc(base64);
    })();
    // (async () => {
    //   const { ipcRenderer } = window.electron;
    //   const uri = await ipcRenderer.invoke(
    //     "fs:getImgAsBlobUri",
    //     "./data/imagesSMGRGRPQEGR156582452884AL.png",
    //   );
    //   setImgSrc(uri);
    // })();
  }, []);

  // const img = new URL(
  //   "../../../data/images/SMGRGRPQEGR156582452884AL.png",
  //   import.meta.url,
  // );
  // console.log(img);
  // console.log(import.meta.url);

  return (
    <div>
      <div>Hello, world!</div>
      {imgSrc !== null && <img src={imgSrc} alt="" />}
      <div>Hello, world!</div>
    </div>
  );
}

// import icons from "./assets/icons.svg";
// import Versions from "./components/Versions";
//
//
// function App(): JSX.Element {
//   return (
//     <div className="container">
//       <Versions></Versions>
//
//       <svg className="hero-logo" viewBox="0 0 900 300">
//         <use xlinkHref={`${icons}#electron`} />
//       </svg>
//       <h2 className="hero-text">
//         You{"'"}ve successfully created an Electron project with React and
//         TypeScript
//       </h2>
//       <p className="hero-tagline">
//         Please try pressing <code>F12</code> to open the devTool
//       </p>
//
//       <div className="links">
//         <div className="link-item">
//           <a
//             target="_blank"
//             href="https://electron-vite.org"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//         <div className="link-item link-dot">•</div>
//         <div className="link-item">
//           <a
//             target="_blank"
//             href="https://github.com/alex8088/electron-vite"
//             rel="noopener noreferrer"
//           >
//             Getting Help
//           </a>
//         </div>
//         <div className="link-item link-dot">•</div>
//         <div className="link-item">
//           <a
//             target="_blank"
//             href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
//             rel="noopener noreferrer"
//           >
//             create-electron
//           </a>
//         </div>
//       </div>
//
//       <div className="features">
//         <div className="feature-item">
//           <article>
//             <h2 className="title">Configuring</h2>
//             <p className="detail">
//               Config with <span>electron.vite.config.ts</span> and refer to the{" "}
//               <a
//                 target="_blank"
//                 href="https://electron-vite.org/config"
//                 rel="noopener noreferrer"
//               >
//                 config guide
//               </a>
//               .
//             </p>
//           </article>
//         </div>
//         <div className="feature-item">
//           <article>
//             <h2 className="title">HMR</h2>
//             <p className="detail">
//               Edit <span>src/renderer</span> files to test HMR. See{" "}
//               <a
//                 target="_blank"
//                 href="https://electron-vite.org/guide/hmr.html"
//                 rel="noopener noreferrer"
//               >
//                 docs
//               </a>
//               .
//             </p>
//           </article>
//         </div>
//         <div className="feature-item">
//           <article>
//             <h2 className="title">Hot Reloading</h2>
//             <p className="detail">
//               Run{" "}
//               <span>
//                 {"'"}electron-vite dev --watch{"'"}
//               </span>{" "}
//               to enable. See{" "}
//               <a
//                 target="_blank"
//                 href="https://electron-vite.org/guide/hot-reloading.html"
//                 rel="noopener noreferrer"
//               >
//                 docs
//               </a>
//               .
//             </p>
//           </article>
//         </div>
//         <div className="feature-item">
//           <article>
//             <h2 className="title">Debugging</h2>
//             <p className="detail">
//               Check out <span>.vscode/launch.json</span>. See{" "}
//               <a
//                 target="_blank"
//                 href="https://electron-vite.org/guide/debugging.html"
//                 rel="noopener noreferrer"
//               >
//                 docs
//               </a>
//               .
//             </p>
//           </article>
//         </div>
//         <div className="feature-item">
//           <article>
//             <h2 className="title">Source Code Protection</h2>
//             <p className="detail">
//               Supported via built-in plugin <span>bytecodePlugin</span>. See{" "}
//               <a
//                 target="_blank"
//                 href="https://electron-vite.org/guide/source-code-protection.html"
//                 rel="noopener noreferrer"
//               >
//                 docs
//               </a>
//               .
//             </p>
//           </article>
//         </div>
//         <div className="feature-item">
//           <article>
//             <h2 className="title">Packaging</h2>
//             <p className="detail">
//               Use{" "}
//               <a
//                 target="_blank"
//                 href="https://www.electron.build"
//                 rel="noopener noreferrer"
//               >
//                 electron-builder
//               </a>{" "}
//               and pre-configured to pack your app.
//             </p>
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default App;
