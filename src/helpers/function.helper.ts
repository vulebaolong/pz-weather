export const logApi = (fullUrl: string, method: string, requestData: any, responseData: any) => {
   try {
      const url = new URL(fullUrl);
      const { pathname } = url;

      const parsedRequestData =
         typeof requestData === "string" ? JSON.parse(requestData) : requestData;

      const methodColors: { [key: string]: string } = {
         GET: "#00ff00",
         POST: "#ffff00",
         PUT: "#0000ff",
         PATCH: "#ff00ff",
         DELETE: "#ff0000",
      };

      const logMessage = `
         API Endpoint: %c${pathname}%c
         Method: %c${method}%c
         Request Data: %o
         Response Data: %o
      `;

      console.log(
         logMessage,
         "color: #25fbea",
         "",
         `color: ${methodColors[method]}`,
         "",
         parsedRequestData,
         responseData
      );
   } catch (error) {
      console.error("Error logging API:", error);
   }
};
