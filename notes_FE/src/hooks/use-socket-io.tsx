// "use client";

// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import type { LocationUpdate } from "@/lib/types/sales-monitoring";
// import tokenService from "@/services/token.service";

// export function useSocketIO(
//   url: string,
//   onLocationUpdate: (update: LocationUpdate) => void
// ) {
//   const socketRef = useRef<Socket | null>(null);
//   const accessToken = tokenService.getLocalAccessToken();

//   useEffect(() => {
//     // Initialize socket connection
//     socketRef.current = io("http://localhost:3000/location", {
//       transports: ["websocket","polling"],
//       // path: "/location",
//       addTrailingSlash: false,
//       reconnection: true,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       reconnectionAttempts: 3,
//       auth: {
//         token: `${accessToken}`, // Send token in headers
//       },
//     });
//     // Listen for location updates
//     socketRef.current.on("updateLocation", (data: LocationUpdate) => {
//       console.log(data, "location data");
//       onLocationUpdate(data);
//     });
//     socketRef.current.on("connection", () => {
//       console.log("WebSocket connected:", socketRef.current?.id);
//     });
//     socketRef.current.on("connect_error", (error) => {
//       console.error("WebSocket connection error:", error);
//       if (socketRef.current) {
//         socketRef.current.io.opts.transports = ["polling", "websocket"];
//       }
//     });

//     // Handle disconnection
//     socketRef.current.on("disconnect", (reason) => {
//       console.warn("Disconnected from WebSocket server:", reason);
//     });

//     // Cleanup on unmount
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [url, onLocationUpdate, accessToken]);

//   return socketRef.current;
// }
