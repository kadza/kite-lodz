export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET") {
      const targetUrl = "http://meteor.iung.pulawy.pl/data2.php?s=405";
      const targetResponse = await fetch(targetUrl, request);

      return new Response(targetResponse.body, {
        status: targetResponse.status,
        headers: {
          "Access-Control-Allow-Origin": "*", // So you can fetch from anywhere
          "Content-Type":
            targetResponse.headers.get("Content-Type") || "text/plain",
        },
      });
    }

    return new Response("Forbidden", { status: 403 });
  },
};
