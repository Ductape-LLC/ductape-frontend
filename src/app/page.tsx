import { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layouts/nav";

export const metadata: Metadata = {
  title: "Ductape - Build products that scale with Ductape SDK and CLI",
  description:
    "Build products that scale with Ductape SDK and CLI. Ductape allows you to build scalable and maintainable integrations with less code.",
};

const codeString = `
{
    "public_key": "da41198023edc30476b29d661b5623bc6842c652",
    "user_id": "62cc17ec5a62fd899d256deo",
    "action_id": "63fa5418e7b7cbe4aeee3504",
    "description": "React when an account gets created successfully",
    "envs": [
      "62e41dd25efa8a33c23d4cc5","62e41dd25efa8a33c23d4cc6"
    ]
}
`;

const StyledJson = () => {
  const formattedJson = codeString
    .replace(/"(\w+)":/g, '<span class="text-[#60d1fa]">$1</span>:') // key color
    .replace(/:\s?"(.*?)"/g, ': <span class="text-white">"$1"</span>') // value color
    .replace(/({|})/g, '<span class="text-white">$1</span>') // braces color
    .replace(/:/g, '<span class="text-white">:</span>'); // colon color

  return (
    <pre>
      <code
        className="text-[#F3AD65] text-sm font-code font-medium"
        dangerouslySetInnerHTML={{ __html: formattedJson.trim() }}
      />
    </pre>
  );
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen bg-[url('/images/homepage-linear-bg.svg')] bg-no-repeat bg-contain bg-top">
      <div className="px-4 pt-6">
        <Nav />
        <main className="max-w-[1344px] mx-auto flex items-center justify-center lg:justify-between py-16 gap-6 xl:gap-0 flex-wrap lg:flex-nowrap">
          <div className="flex flex-col items-center lg:items-start max-w-[580px] text-center lg:text-start">
            <h1 className="text-grey font-bold text-4xl lg:text-[3.5rem] lg:w-4/5 leading-tight">
              Build products that scale
            </h1>
            <p className="text-grey-500 mt-4 lg:text-xl">
              Ductape allows you to build scalable and maintainable integrations
              with less code.
            </p>
            <div className="mt-6 flex items-center gap-4 lg:gap-5 font-semibold text-sm lg:text-base whitespace-nowrap flex-col md:flex-row">
              <a
                href="https://www.npmjs.com/package/ductape-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary rounded-full px-6 py-4 flex items-center gap-4 text-white"
              >
                <Image
                  src="/images/ductape.svg"
                  width={24}
                  height={24}
                  alt="cta"
                />
                Download Ductape
              </a>
              <a
                href="https://docs.ductape.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-4 flex items-center gap-4 text-grey border border-grey-500"
              >
                Read documentation
              </a>
            </div>
          </div>

          <div className="hidden md:block relative w-[680px] h-[528px]">
            <Image
              src="/images/hero-code-snippet.svg"
              fill
              alt="ductape"
              priority
            />
          </div>

          <div className="md:hidden">
            <Image
              src="/images/hero-code-snippet.svg"
              width={680}
              height={528}
              alt="ductape"
              priority
            />
          </div>
        </main>

        <section className="md:pt-20 pb-28 bg-[url('/images/software-section-art.svg')] bg-no-repeat bg-auto bg-[right_-45px_bottom_0] -mx-4">
          <div className="max-w-[1344px] mx-auto px-4">
            <h3 className="text-2xl lg:text-[2.5rem] max-w-[998px] text-grey font-medium leading-snug">
              As a software company building on top of 3rd party integrations,
              you’re likely to want to solve one or more of these problems:
            </h3>

            <div className="mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-14 max-w-[1011px]">
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/rectangle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="-mt-1 text-grey font-medium lg:text-xl">
                  You have an existing backlog of integrations to build and are
                  experiencing pressure from your clients
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/rectangle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="-mt-1 text-grey font-medium lg:text-xl">
                  You struggle with having a standard operating procedure for
                  your integrations
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/rectangle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="-mt-1 text-grey font-medium lg:text-xl">
                  You have to constantly build tools to monitor performance,
                  handle retries and rollbacks, error troubleshooting and
                  maintenance
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/rectangle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="-mt-1 text-grey font-medium lg:text-xl">
                  You want your services to keep running even when there are
                  network outages or server crashes
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Image
                  src="/images/rectangle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="-mt-1 text-grey font-medium lg:text-xl">
                  You have to build custom logic to handle multiple service
                  providers and aggregate functionality between them while
                  ensuring that performance doesn’t suffer
                </p>
              </div>
            </div>

            <p className="mt-10 md:mt-16 text-grey md:text-xl lg:text-2xl font-semibold max-w-[910px]">
              Ductape is a comprehensive integration framework with built-in
              tools for performance monitoring, automated retries, rollbacks,
              and error handling that helps simplify development, maintain
              performance, and reduce complexity.
            </p>
          </div>
        </section>

        <section className="bg-primary pt-20 pb-32 -mx-4">
          <div className="max-w-[1344px] mx-auto flex flex-col px-4">
            <div className="flex items-center gap-2 text-white font-semibold px-6 py-3 border border-white rounded-full w-fit">
              <Image
                src="/images/code-icon.svg"
                width={24}
                height={24}
                alt=""
              />
              Why Ductape
            </div>
            <h2 className="mt-4 text-white leading-tight text-3xl lg:text-5xl max-w-[735px] lg:leading-tight font-semibold">
              With Ductape SDK and CLI, you reduce development time and
              accelerate time-to-market.
            </h2>

            <div className="mt-16 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 xl:gap-y-16">
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px]">
                <Image src="/images/ar.svg" width={48} height={48} alt="" />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold leading-snug">
                  Rapid Feature Integration
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Leverage Ductape SDK and CLI to quickly add new features to
                  your product, reducing development time and accelerating
                  time-to-market.
                </p>
              </div>
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px] leading-snug">
                <Image
                  src="/images/rocket-alt.svg"
                  width={48}
                  height={48}
                  alt=""
                />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold lg:max-w-[355px] leading-snug">
                  Comprehensive Testing before Deployment
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Use Ductape's robust testing framework to evaluate your
                  features in various environments, ensuring stability and
                  performance before making them publicly available.
                </p>
              </div>
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px]">
                <Image
                  src="/images/gear-ai.svg"
                  width={48}
                  height={48}
                  alt=""
                />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold lg:max-w-[345px] leading-snug">
                  Robust Version Control
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Maintain multiple versions of your product with Ductape's
                  built-in version control, enabling you to track changes,
                  manage updates, and roll back to previous states when
                  necessary.
                </p>
              </div>
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px">
                <Image src="/images/target.svg" width={48} height={48} alt="" />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold lg:max-w-[355px] leading-snug">
                  Effective A/B Testing of Features
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Implement and manage A/B testing with Ductape to compare
                  different feature versions and determine the most effective
                  solution for your users.
                </p>
              </div>
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px]">
                <Image
                  src="/images/terminal.svg"
                  width={48}
                  height={48}
                  alt=""
                />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold lg:max-w-[355px] leading-snug">
                  Execution of Long-Running Jobs
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Utilize Ductape to create and run long-running jobs and
                  workflows efficiently, minimizing external output and ensuring
                  smooth, uninterrupted operations.
                </p>
              </div>
              <div className="border border-white rounded-lg p-5 lg:p-9 lg:pl-7 flex flex-col xl:h-[470px]">
                <Image src="/images/code.svg" width={48} height={48} alt="" />
                <h3 className="text-white text-xl lg:text-3.5xl mt-4 font-semibold lg:max-w-[355px] leading-snug">
                  Secure Database CRUD Operations
                </h3>
                <p className="font-medium text-sm lg:text-xl text-white mt-8">
                  Perform Create, Read, Update, and Delete operations on your
                  secure database with Ductape, ensuring data integrity and
                  security throughout the integration lifecycle.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[1344px] mx-auto xl:pt-14 xl:pb-24">
          <div className="py-12 lg:py-28 flex items-center justify-between flex-wrap lg:flex-nowrap gap-12 lg:gap-6 xl:gap-0">
            <div className="flex flex-col lg:max-w-[539px]">
              <h2 className="text-3xl lg:text-5xl text-grey leading-tight font-semibold lg:max-w-[270px] lg:leading-snug">
                Ductape for developers
              </h2>
              <p className="mt-4 text-grey-500 font-medium">
                Ductape provides a developer-friendly sdk that helps developers
                get started on all they need
              </p>

              <div className="mt-10 flex flex-col gap-4 text-grey font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/check.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>Conduct Effective A/B Testing of Features</p>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/check.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>Efficient Execution of Long-Running Jobs and Workflows</p>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/check.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>
                    Secure Database CRUD Operations for Seamless Data Management
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/check.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>
                    Comprehensive Logging for Improved Debugging and Monitoring
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col grow max-w-[668px]">
              <div
                className="bg-[#201741] p-6 border-b-2 border-b-primary overflow-x-auto"
                style={{
                  contain: "inline-size",
                }}
              >
                <StyledJson />
              </div>
              <div className="bg-[#16102D] px-6 py-7 flex flex-col gap-4">
                <p className="text-white font-medium">
                  Leverage Ductape SDK and CLI to quickly add new features to
                  your product.
                </p>
                <a
                  href="https://docs.ductape.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full px-6 py-3 flex items-center gap-2 text-white border border-white w-fit"
                >
                  Read documentation
                  <Image
                    src="/images/arrow-right.svg"
                    width={24}
                    height={24}
                    alt=""
                    className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <footer
          className="bg-primary pt-24 pb-20 -mx-4 relative 
        bg-[url('/images/footer-art.svg')] bg-no-repeat bg-contain"
        >
          <div className="max-w-[1344px] mx-auto px-4">
            <div className="flex flex-col items-center gap-12 pb-20">
              <h3 className="font-semibold text-white text-3xl md:text-4xl max-w-[662px] md:leading-snug text-center">
                Ready to launch products faster by using Ductape?
              </h3>
              <a
                href="https://www.npmjs.com/package/ductape-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full px-6 py-4 flex items-center gap-4 text-primary font-semibold"
              >
                <Image
                  src="/images/ductape-blue.svg"
                  width={24}
                  height={24}
                  alt="cta"
                />
                Download Ductape
              </a>
            </div>
            <div className="absolute left-0 right-0 w-full h-[0.5px] bg-[#EFEFEF]" />
            <div className="pt-18">
              <Image
                src="/images/logo-white.svg"
                width={148}
                height={38}
                alt="logo"
              />
              <div className="flex items-start justify-between gap-6 flex-wrap mt-7">
                <div className="flex flex-col gap-7 text-sm md:text-base">
                  <div className="flex items-center gap-6 flex-wrap">
                    <a
                      href="https://docs.ductape.app/"
                      className="text-white font-semibold underline uppercase"
                    >
                      documentation
                    </a>
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      DEVELOPERS
                    </a>
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      PRICING
                    </a>
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      CASE STudies
                    </a>
                  </div>
                  <div className="flex items-center gap-6">
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      LINKEDIN
                    </a>
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      GITHUB
                    </a>
                    <a
                      href="#"
                      className="text-white font-semibold underline uppercase"
                    >
                      EMAIL
                    </a>
                  </div>
                </div>
                <p className="text-white font-semibold">
                  © Ductape Technology 2024
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
