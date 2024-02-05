/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {

                protocol: "https",
                hostname: "week8-fake-drive.s3.us-east-1.amazonaws.com"
            }
        ]
    }
}

module.exports = nextConfig
