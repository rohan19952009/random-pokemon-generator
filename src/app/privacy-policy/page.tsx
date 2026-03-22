import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Random Pokémon Generator",
  description: "Learn how we collect, use, and protect your data at Random Pokémon Generator. Our commitment to user privacy and data security.",
  alternates: {
    canonical: "https://randompokemongenerator.info/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">Last Updated: March 20, 2026</p>
        <p>At Random Pokémon Generator, accessible from **randompokemongenerator.info**, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Random Pokémon Generator and how we use it.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Log Files</h2>
        <p>Random Pokémon Generator follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Web Beacons</h2>
        <p>Like any other website, Random Pokémon Generator uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Google DoubleClick DART Cookie</h2>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to **randompokemongenerator.info** and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Advertising Partners</h2>
        <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:</p>
        <ul>
            <li>Google</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Privacy Policies</h2>
        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Random Pokémon Generator.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Third Party Privacy Policies</h2>
        <p>Random Pokémon Generator's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Children's Information</h2>
        <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
        <p>Random Pokémon Generator does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Online Privacy Policy Only</h2>
        <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Random Pokémon Generator. This policy is not applicable to any information collected offline or via channels other than this website.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
      </div>
    </main>
  );
}
