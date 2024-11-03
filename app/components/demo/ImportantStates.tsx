interface StateData {
  id: string;
  probabilities: { count: number; percent: number; text: string }[];
  margin: number;
}

export default function ImportantStates({ data }: { data: StateData[] }) {
  return (
    <div className='grid gap-5 lg:grid-cols-3'>
      {STATES.map((state) => (
        <StateCard
          key={state.id}
          state={state}
          data={data.find((x) => x.id === state.id)!}
        />
      ))}
    </div>
  );
}

function StateCard({
  state,
  data,
}: {
  state: (typeof STATES)[0];
  data: StateData;
}) {
  return (
    <div className='bg-[#303036] p-5'>
      <div className='mb-8 flex h-[72px] items-center justify-between'>
        <h3 className='font-serif text-3xl'>{state.name}</h3>
        <svg
          viewBox={`0 0 ${state.dimensions.width} ${state.dimensions.height}`}
          width={state.dimensions.width}
          height={state.dimensions.height}
        >
          <path d={state.path} fill='#181818' />
        </svg>
      </div>
      <p className='border-t border-white/20 pb-4 pt-1 text-xs font-bold uppercase tracking-tight'>
        PROBABILITY
      </p>
      <div className='space y-1'>
        {data.probabilities
          .toSorted((a, b) => b.count - a.count)
          .map((probability, index) => (
            <div key={index}>
              <div className='flex items-center justify-center'>
                <SmallerLetter
                  className='mr-2 text-white'
                  letter={
                    LETTERS[probability.text as keyof typeof LETTERS] ?? 'U'
                  }
                  backgroundColor={
                    COLORS[probability.text as keyof typeof COLORS]
                  }
                />
                <p className='mr-3'>{probability.text}</p>
                <div className='ml-auto'>
                  <span>{probability.percent.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <p className='mt-10 border-t border-white/20 pb-4 pt-1 text-xs font-bold uppercase tracking-tight'>
        Margin Delta
      </p>
      <div className='flex items-center justify-center'>
        {data.margin > 0 ? (
          <SmallerLetter
            className='mr-2 text-white'
            letter={'R'}
            backgroundColor={COLORS['Donald Trump']}
          />
        ) : data.margin < 0 ? (
          <SmallerLetter
            className='mr-2 text-white'
            letter={'D'}
            backgroundColor={COLORS['Kamala Harris']}
          />
        ) : (
          <SmallerLetter
            className='mr-2 text-white'
            letter={'-'}
            backgroundColor={COLORS['Undecided']}
          />
        )}
        <p className='mr-3'>
          {data.margin > 0
            ? 'Donald Trump'
            : data.margin < 0
              ? 'Kamala Harris'
              : 'Standstill'}
        </p>
        <div className='ml-auto'>
          <span>+{Math.abs(data.margin)}</span>
        </div>
      </div>
    </div>
  );
}

const STATES = [
  {
    name: 'Pennsylvania',
    path: 'M44.4999 9.42249L43.9073 9.75046L43.6432 9.98244L43.4269 10.3105L42.8905 11.4464L41.9937 12.4704L41.305 12.9984V13.2704L41.6654 14.1344L41.6573 14.4144L41.3851 14.9504L40.9127 15.2144L40.8326 15.5264L40.7846 16.0624L40.8086 16.9903L40.9448 17.1823L41.4972 17.5103L41.9696 18.7263L42.41 18.8703L44.2277 21.3422L42.9145 22.0703L42.0497 22.6862L41.6734 23.0142L40.9287 23.8862L39.8157 24.1742L39.2072 24.5022L39.055 24.6542L38.3825 24.3822L37.4456 24.4222L37.1253 24.5422L36.8851 24.7822L36.3166 25.5662H34.5791H32.8335H31.096H29.3584H27.6209H25.8753H24.1378H22.4002H20.6627H18.9172H17.1796H15.442H13.6965H11.959L10.2214 25.5582H8.48385L7.49899 25.5662H6.51413H5.53723H4.55237H3.57548H2.59062H1.60576H0.628865V24.4382V23.3022L0.62085 22.1743V21.0382V19.9023V18.7583V17.6223L0.628865 16.4863L0.62085 15.4383V14.4064V13.3584V12.3184V11.2785V10.2304V9.18245V8.13447V7.07854V6.03051V4.97457V3.91858V3.07861L2.0221 2.5586L2.64667 2.2066L3.2712 1.87062L3.59952 1.67063L3.96787 1.4946L6.32993 0.182617V0.238622V1.59861V2.95859H7.3709L8.4038 2.9666H9.44471H10.4856H11.5266H12.5675H13.6004H14.6413H15.6822H16.7232H17.7641L18.797 2.97461H19.8379H20.8789H21.9198H22.9527H23.9936H25.0346H26.0755H27.1084H28.1493L29.1903 2.98257H30.2312H31.2721H32.305H33.346H34.3869H35.4278H36.4607H37.5017H38.5426L39.5835 2.99057L40.168 3.51058L40.4323 4.05457L41.313 4.44655L41.5132 4.67057V4.99054L41.8255 5.33453L41.7294 5.86254V6.32655L41.8415 6.91052L42.0577 7.47052L42.37 7.91851L42.7143 8.25449L44.0675 8.75849L44.3398 9.05448L44.4999 9.42249Z',
    id: 'pa',
    dimensions: {
      width: 45,
      height: 26,
    },
  },
  {
    name: 'Georgia',
    path: 'M36.4999 26.8861L36.1156 27.6301L35.1948 28.0941L34.9145 28.0781L34.6823 28.2141L34.8184 28.5501L35.0506 28.7901L35.0427 29.0141L34.8024 29.3181L34.322 29.4061L34.0497 29.7581L34.1379 30.0861L34.298 30.2701L34.266 30.5821L33.7215 30.9021L33.5933 31.214L33.8656 31.3021L34.0738 31.214L34.2259 31.278L33.8976 31.7981L33.6013 32.118L33.3211 32.686L32.6725 32.846L32.6965 33.03L33.0649 33.19L33.3692 33.63L32.7926 34.438L32.4323 34.374L32.2161 34.198L32.08 34.838L32.1361 35.174L31.9999 35.87L31.7758 36.702L31.6236 37.046L31.6556 37.6779L31.7517 38.2939L30.4786 38.2139L28.9172 37.6379L28.5008 37.5259L28.3407 37.5739L28.1485 37.7899L27.9243 37.8859L27.7322 38.2859L27.7081 38.9739L27.8522 39.7899L27.7882 40.5019L27.548 41.1339L27.1636 41.4219L26.7873 41.3819L26.5471 41.2299L26.459 40.9819L26.411 40.4699L26.2108 40.0219L26.2028 39.7339L25.0017 39.6539L23.8006 39.5739L22.5996 39.4939L21.3985 39.4139L20.1974 39.3339L18.9964 39.2539L17.7953 39.1739L16.5942 39.0939L15.3932 39.0139L14.1921 38.9339L12.991 38.8539L11.79 38.7739L10.5889 38.6939L9.38782 38.6139L8.18675 38.5339L6.98568 38.4539L6.28105 38.4059L6.25706 38.0699L5.65652 36.646L5.34423 35.9579L4.88782 34.942L4.69566 33.382L4.9839 30.9501L4.89584 30.3981L4.46347 29.1501L4.47144 28.2381L4.91983 26.7341L5.14405 25.8781L5.45634 25.3982L5.93675 24.9982L6.00082 24.6462L5.64851 24.3422L5.5124 23.9742L5.60047 23.5422L5.28818 22.5022L4.22322 20.0303L4.07108 19.1903L3.88693 18.6703L3.68675 17.5263L3.48657 16.3823L3.2864 15.2383L3.08622 14.0944L2.88604 12.9424L2.68586 11.7904L2.48568 10.6384L2.28551 9.48645L2.08533 8.32646L1.88515 7.16647L1.68497 6.00649L1.48479 4.84655L1.28462 3.68656L1.08444 2.51856L0.88426 1.35061L0.684082 0.182617L3.13426 0.214599L5.58444 0.24663L8.03461 0.278612L10.4848 0.310593L12.7669 0.278612L15.0489 0.24663L17.3309 0.214599L19.6129 0.182617L19.5649 0.190625L19.1965 0.80658L18.0916 1.96657L17.7953 2.85454L19.2206 3.84656L19.2286 3.85452L20.0774 4.65451L20.6619 4.96651L21.2544 5.06251L21.6227 5.32652L21.8389 5.9665L23.5685 9.12645L25.362 10.7504L26.0827 11.5504L26.443 12.3184L27.9724 13.5824L28.4928 14.2623L28.5168 14.7743L28.701 15.1424L29.0373 15.3583L29.3576 15.8223L29.6699 16.5263L30.2784 17.1423L31.1912 17.6623L31.8558 18.8542L32.2802 20.7023L32.7126 21.7742L33.3692 22.2222L34.266 23.7982L34.5542 24.7342L34.5382 25.5581L34.9946 26.1982L36.4999 26.8861ZM32.3763 36.182L32.04 38.3099L31.8958 37.5579L31.8798 36.8299L32.1361 36.398L32.3763 36.182Z',
    id: 'ga',
    dimensions: {
      width: 37,
      height: 42,
    },
  },
  {
    name: 'North Carolina',
    path: 'M63.6486 0.814588L63.4484 1.54255L63.5525 1.95856L63.9528 2.39054L64.3933 3.46254L64.7456 4.9025L64.2731 4.31853L63.7687 4.00652L62.984 3.76654L62.2794 3.35053L62.3274 3.95052L62.2633 4.5985L61.7269 4.39851L61.3585 4.18254L61.6869 4.87052L60.9822 4.66252L60.5098 4.70251L60.2055 5.3105L59.7971 5.67851L59.1886 5.79848L58.2838 5.23848L57.9955 4.56652L57.8755 3.81453L57.8274 4.70251L57.9876 5.63052L57.9315 6.33451L58.7962 6.46248L59.605 6.35047L60.7019 6.3825L61.4146 6.24647L61.847 6.0225L62.8799 6.21449L62.9519 7.06247L62.8319 7.90245L62.7758 8.79843L63.0641 8.79042L63.4003 8.50244L63.5685 6.89446L64.5133 6.30248L64.8256 6.34247L65.1299 6.86248L65.234 7.39045L65.3381 8.11045L65.1139 9.20643L63.6646 10.4864L62.6317 11.6624L62.1032 11.9024L61.3426 11.7664L60.4778 11.4704L60.0534 11.4144L59.7331 11.5104L59.5329 11.1504L59.4048 10.4864L59.0685 10.2624L58.8123 10.2864L58.6361 10.9904L57.8274 11.1904L56.7304 10.9024L55.5774 10.3104L56.0739 10.9424L58.9324 12.1264L59.2527 12.3504L59.5569 12.6704L59.1566 13.1744L58.8443 13.7423L58.7962 14.1903L58.6842 14.4703L57.5471 15.2303L56.9306 15.0943L55.3532 13.7264L56.0739 14.9103L56.6503 15.4143L57.8114 15.6783L59.9813 15.2383L60.694 15.7183L60.1094 16.5743L59.5249 17.1743L58.7642 17.2383L58.0917 17.3983L57.8915 17.8063L57.411 17.8303L56.6664 17.8543L55.5053 17.8943L54.8728 17.7983L53.984 18.6382L53.6477 18.7502L53.1833 18.5902L52.9831 17.9183L52.7749 17.5823L52.7669 18.8462L52.847 19.1823L53.0151 19.4382L51.9742 20.1262L50.9813 20.9822L50.621 21.2142L50.2126 21.6382L49.3799 22.8702L49.1717 23.7662L48.8755 24.7662L48.8354 24.3182L48.8835 23.5582L48.6753 22.6942L48.5471 24.2862L48.2269 25.0222L45.2642 24.9742L44.0712 25.3421L42.9822 24.2461L41.9653 23.2142L40.9484 22.1822L39.9315 21.1502L38.9146 20.1102L37.8977 19.0703L36.8808 18.0303L35.8639 16.9903L34.7989 16.9503L33.734 16.9183L32.669 16.8783L31.6041 16.8463L30.5391 16.8063L29.4742 16.7743L28.4093 16.7343L27.3443 16.7023L27.3043 15.9823L27.2722 15.4703L26.6077 14.5983L26.2153 14.0864L25.3745 14.5264L25.3265 14.3103L25.3585 13.9264L25.2865 13.7903L25.0543 13.6943L23.8612 13.6383L22.6681 13.5824L21.4751 13.5264L20.282 13.4704L19.0889 13.4144L17.8959 13.3584L16.7028 13.3024L15.5097 13.2463L15.2375 13.1584L14.7011 13.4624L13.2838 13.9184L12.5872 14.3183L12.3309 14.2943L11.1299 14.6864L9.9288 15.0783H9.79269L7.51063 15.1103L5.22862 15.1423L2.94656 15.1743L0.664551 15.2063L0.944781 13.2544L1.13699 12.8064L1.35315 12.7024L2.13788 12.6944L2.63432 12.4704L3.0747 11.2944L4.07559 10.3664L4.52399 10.1344L5.19661 9.95041L6.79002 9.72644L8.50351 8.82245L9.73664 7.96646L10.7135 7.72647L11.0178 7.41447L11.242 7.00647L11.3781 6.44647L11.4822 6.3265L12.0507 6.36649L12.4831 5.87851L12.8995 5.59849L13.3158 5.43848L13.572 5.43052L13.6681 5.57451L13.7402 5.99047L13.8283 6.1265L14.0044 6.13451L14.2446 6.03847L14.5649 5.77451L15.3977 4.94249L15.9502 4.62253L16.7989 4.4385L17.4154 4.87853L17.7838 4.72653L18.8647 3.02256L19.2971 2.71055L19.6174 2.59053L20.1779 2.56656L20.1859 2.09455L20.3781 1.3826L20.4021 0.894567L20.7464 0.182617L20.8745 0.326609L23.605 0.350583L26.3354 0.374606L29.0658 0.39858L31.7963 0.422603L34.5267 0.446577L37.2571 0.4706L39.9875 0.494574L42.718 0.518597L45.4484 0.542572L48.1788 0.566595L50.9093 0.590569L53.6397 0.614592L56.3701 0.638566L59.1005 0.662589L61.831 0.686612L63.6486 0.814588ZM64.2331 0.830603H64.4733L65.226 3.82254L66.7313 7.07048L66.9155 7.63048L66.5632 7.14245L65.4502 4.9985L64.8256 3.43056L64.2331 0.830603ZM66.1388 7.27848L66.0267 7.47047L65.5222 6.44647L66.0347 6.77449L66.1228 7.04646L66.1388 7.27848ZM66.8274 12.9584L65.8185 13.2064L65.7304 13.1264L66.8915 12.6064L67.2598 10.7584L67.3078 9.90241L67.1317 8.39843L67.1397 8.08648L67.3319 8.57446L67.5 9.98244L67.436 11.0464L67.0997 12.5904L66.8274 12.9584ZM65.0338 13.4144L63.6646 14.0704L63.5125 14.0304L64.4092 13.5583L65.0338 13.4144ZM59.597 18.4143L59.4128 18.5183L60.1014 17.3823L61.4626 15.9343L61.831 15.7103L60.694 16.9423L59.597 18.4143ZM59.2767 18.3103L59.1085 18.3343L58.8123 18.2303L58.4039 18.0382L58.3158 17.8943L58.7082 17.9423L59.2767 18.3103',
    id: 'nc',
    dimensions: {
      width: 68,
      height: 26,
    },
  },
  {
    name: 'Michigan',
    path: 'M11.1761 2.99055L11.1361 3.17456L11.4083 3.23056L11.3603 3.32655L11.064 3.49454L10.2233 3.83853L9.65476 3.95054L9.36652 3.83055L9.33451 3.59855L9.5667 3.26254V3.09455H9.33451L9.39056 2.95857L9.73486 2.69456L12.6815 0.998594L13.9386 0.382614L14.6112 0.182617L14.7233 0.278612L13.9947 0.91859L13.8745 1.1826L13.9065 1.3586L13.6663 1.69458L11.5124 2.87856L11.1761 2.99055ZM16.701 10.9504L16.5649 11.3104L16.589 11.5264L15.6761 12.4704L15.3398 13.0704L15.0596 13.1664L14.8354 12.7584V12.4304L15.0596 12.1824L15.2838 11.8304L15.3158 11.3424L15.2277 11.1664L14.9475 11.6064L15.0996 11.7024L15.1476 11.7744L15.0916 11.9344L14.0427 11.7024L13.7224 11.3584L13.7704 10.8864L14.1228 10.2784L15.3879 8.99044L15.9483 8.63046L17.5338 8.06245L18.4065 7.93448H19.2874L19.9199 8.11846L20.3122 8.49445L19.9359 8.74245L18.1984 8.95045L18.1503 9.01444L18.4786 9.21444L18.5427 9.35845L18.2384 9.73445L16.701 10.9504ZM45.823 18.7023L46.0552 18.8463L46.2153 19.0863L46.6077 19.7583L46.7998 20.2142L46.9199 20.8862L47 21.1102L46.992 21.5022L46.7277 21.7662L46.6557 21.9742L46.8158 22.1822L47.7046 22.2382L48.113 22.4462L48.2651 22.6782L48.161 22.9342L48.2171 23.2062L48.4332 23.4942L49.1459 23.9342L49.3221 24.1422L49.274 24.3662L49.0578 24.5102L48.6815 24.5742L45.9511 24.1582L45.1503 24.0942L45.0302 24.2462L44.9502 24.2702L44.8221 24.2302L44.5898 24.2222L44.4698 24.1262L44.3736 23.8542L44.1334 23.6782L43.7571 23.5982L43.4288 23.8062L43.0525 24.6222L43.1085 24.7742L43.0445 25.3022L43.1406 25.4461L43.1325 25.5661L43.0284 25.6621L42.8043 25.6461L42.468 25.5181L41.1868 24.2782L40.218 23.6622L39.0169 23.2062L38.0641 22.9822L37.3674 22.9902L36.7909 23.3102L36.3425 23.9342L35.6379 24.2862L34.685 24.3742L34.1646 24.5422L34.0845 24.7902L33.7402 24.7982L33.1316 24.5582L32.5071 24.4942L31.8585 24.5982L31.3861 24.8462L30.8817 25.6141L30.7856 25.9901L30.4252 26.3181L29.4644 26.8301L29.4163 27.0221L28.9119 27.6061L28.7518 27.9261V28.2381L28.5836 28.2221L28.2393 27.8701L28.2233 27.3981L28.5356 26.7981L28.8158 26.5101L29.064 26.5261L29.2162 26.2621L29.2722 25.7181L29.1841 25.4461L28.7037 25.5501L28.4555 25.7661L28.1352 25.8141L27.7509 25.6861L27.4146 25.9821L27.1183 26.7021L26.766 27.1741L26.3576 27.3981L26.0854 27.1501L25.9493 26.4381V25.8781L26.1174 25.1982L26.0293 25.0621L25.8612 25.2782L25.605 25.8461L25.2606 27.0781L25.0365 27.4781L24.7402 27.6461L24.2678 28.3901L23.6192 29.7101L22.8906 30.99L22.0818 32.222L21.5934 32.886L21.4333 32.982L21.3612 33.206L21.3372 33.718L20.9768 33.574L20.6726 33.158L20.4884 32.726L20.4724 32.286L20.9128 31.19L20.9528 31.014L20.9048 30.91L20.6646 30.79L20.1201 30.99L19.5676 31.0301L19.3915 30.9581L19.3194 30.766L19.3274 30.4701L19.4395 30.1181L19.7678 29.4701V28.8541L19.9199 28.5021L19.7758 27.8461L19.8158 27.5341L19.5836 27.1901L18.959 26.7421L17.5017 26.1421L17.6539 25.4701L17.5898 25.1822L17.2295 24.7502L15.7001 24.2462L14.6592 24.0142L13.6263 24.0062L12.8897 23.8222L12.0569 23.7662L11.5285 23.4622L11 23.1582L10.4715 22.8542L9.94301 22.5502L8.99817 22.2862L8.05334 22.0222L7.1085 21.7582L6.16367 21.4942L5.21883 21.2302L4.274 20.9662L3.32917 20.7022L2.38433 20.4382L2.17614 19.9823L1.96795 19.5263L1.75975 19.0703L1.55156 18.6143L1.11919 18.4223L0.886955 18.3183L0.718836 18.0783L0.334461 18.1823L0.182373 17.7823L0.222399 17.6943L0.718836 17.5903L2.13606 17.0223L3.34515 16.3263L4.34604 15.5023L5.59515 14.9983L7.09247 14.8143L8.15743 14.5264L8.80601 14.1264L9.67079 13.3504L10.1592 13.1264L10.7678 13.0544L11.2242 12.7504L11.5365 12.2224L12.121 11.6224L12.9777 10.9424L13.4662 10.6704L13.5863 10.7984L13.6343 11.0384L13.6023 11.3904L13.8185 11.6704L14.2829 11.8864L14.4911 12.1744L14.451 12.5344L14.5792 12.8384L14.8674 13.0864L14.9475 13.6304L14.8114 14.4703L14.7954 15.0143L14.8994 15.2623L15.0035 15.3983L15.1717 15.2623L15.3799 14.9663L15.4519 14.7824L15.508 14.5983L16.7651 13.7504L17.0133 13.7104L17.4217 13.9264L19.3194 14.2304L20.072 14.4463L20.8647 14.9344L21.129 15.1183L22.0979 16.6863L22.5382 17.3023L22.8105 17.4703L22.9626 17.7103L23.0907 18.2623L23.2429 18.4303L24.6521 18.5503L25.2927 18.4463L25.685 18.2223L26.1174 18.3663L26.5898 18.8783L27.0543 19.0223L27.5187 18.7983L27.9511 18.8063L28.3594 19.0463L28.5516 19.2223L28.6717 19.2143L29.4724 18.4383L30.4413 17.7503L31.7304 16.9983L32.4751 16.6623L32.6833 16.7423L33.8763 16.4943L34.9493 16.4703L36.3665 16.6223L37.6797 16.4463L38.8888 15.9423L39.9617 15.6623L40.8986 15.5983L41.2509 15.7423L41.0187 16.0783L40.8986 16.6623L40.8825 17.4863L40.8025 18.0063L40.6584 18.2223L40.6423 18.4303L40.7464 18.6303L41.6512 18.7583L42.1236 19.0223L42.6682 19.0303L43.2847 18.7903L43.7571 18.8783L44.0854 19.3023L44.5578 19.3823L45.0223 19.0783L45.3505 18.7903L45.6308 18.6623L45.823 18.7023ZM47.5205 20.2542V20.4862L47.2882 20.4302L47.0961 20.2702L46.9439 20.0063L46.7518 19.3503L46.4555 18.8863L46.8959 18.3583L47.1601 18.2943L47.4484 18.4143L47.4884 18.7263L47.2802 19.2223L47.2882 19.7343L47.5205 20.2542ZM47.6166 21.5182L47.5125 21.5822L47.1361 21.1582L47.056 20.8942L47.1121 20.6782L47.2562 20.6702L47.4964 20.8702L47.6325 21.1022L47.6646 21.3662L47.6166 21.5182ZM52.2687 24.0382L52.3407 24.2782L52.1566 24.6302L51.6281 24.8142L50.5552 24.7982L49.8585 24.6622L49.5382 24.4062L49.4662 24.2782L49.4982 23.9982L49.6503 23.9822L49.8825 24.1342L50.2269 24.0702L50.6832 23.7822L50.9235 23.5662L50.9475 23.4222L50.8034 23.1502L50.9235 23.0382L51.492 23.1422L51.7002 23.3182L52.0845 23.9262L52.2687 24.0382ZM44.3256 26.1181L45.2945 26.2701L45.3906 26.1901L45.6628 26.4781L45.7028 26.7181L45.5907 26.9181L45.4226 27.0301L45.2064 27.0461L44.8621 26.8381L44.2936 26.2941L44.3256 26.1181ZM42.7802 26.4221L43.3167 26.6221L44.2856 27.2861L45.1984 27.6701L46.0632 27.7821L46.6957 28.0141L47.0961 28.3741L47.3843 28.7741L47.5605 29.2141L47.9768 29.4621L48.6255 29.5181L49.1379 29.7021L49.5142 30.0221L51.5881 30.8461L52.4528 31.278L52.9332 31.702L53.0694 31.974L53.0294 32.246L53.0774 32.534L53.4297 33.094L53.5658 33.142L53.6459 33.414L53.678 33.902L53.782 34.23L53.9582 34.398L53.8541 34.462L53.2135 34.182L52.8532 34.27L52.685 34.638L52.661 34.982L52.7811 35.31L53.5979 36.2859L53.8141 37.1739L53.8541 38.2459L53.75 38.6619L53.6619 39.5819L53.5979 41.0059L53.5818 41.4939L53.3096 41.9658L52.5809 42.6458L52.573 42.5178L52.3968 42.4858L52.2046 42.5898L51.9404 43.1738L51.7162 44.2378L51.4439 44.8138L51.1237 44.9018L50.9315 45.0538L50.8674 45.2698L50.5231 45.4138L49.8905 45.4858L49.4582 45.8058L49.1379 46.7098L49.1539 47.1418L49.0018 47.6777L49.0098 48.1418L49.1779 48.5257L49.6904 48.9097L50.5391 49.2937L51.0436 49.3497L51.3959 49.1897L51.7642 48.5577L52.1166 48.3097L52.5489 48.2057L52.7091 47.9177L53.4217 46.6618V46.3818L53.1655 46.2778L53.2055 46.1977L53.5418 46.1497L53.8301 45.9818L54.0783 45.6938L54.5107 45.4778L55.5676 45.1498L56.1361 44.7738L56.4964 44.7098L57.0169 44.9098L57.6975 45.3738L58.234 46.0458L58.6344 46.9258L59.1388 49.2057L59.7473 52.8696L60.1637 54.9096L60.3879 55.3416L60.5 55.5576L59.9635 58.4055L59.5312 59.5735L58.7785 60.2535L58.0338 60.9095L57.105 62.0135L56.0801 62.5575L55.5596 62.8775L55.4475 63.0855L55.3194 63.0215L55.0391 63.6215L54.7909 64.4455L54.6948 65.0774L54.7829 65.4294L54.5667 65.6534L54.1824 66.0694L54.1103 66.2214L54.1343 66.4694L54.0543 66.5894L53.8701 66.5814L53.726 66.7014L53.3816 67.1414L52.7811 68.2854L52.685 68.4934L52.613 68.5574L50.1068 68.6533L47.6005 68.7493L45.0943 68.8454L42.5881 68.9414V68.3574H40.306H38.024H35.742H33.46H31.1779H28.8959H27.0302L27.5187 68.0774L28.3194 67.4214L28.7678 66.8374L29.2002 66.0694L29.6165 65.1174L30.4653 63.6855L30.8817 62.8215L31.282 61.7175L31.5863 60.5655L31.7865 59.3575L31.8825 58.1015L31.8745 56.7976L31.6743 55.4856L31.282 54.1576L31.0658 53.4776L30.9857 53.2937L30.2731 51.5897L29.4644 49.2057L29.4724 49.0057L30.2251 47.5818L30.2411 47.3898L30.161 46.2298L30.0009 45.6458L29.6165 44.8618L29.6325 44.6618L30.4172 43.6618L30.8897 42.9018L31.314 41.9739L31.5943 40.8939L31.7224 39.6539V38.8299L31.5863 38.4139L31.6023 38.0939L31.7704 37.8699L32.6112 37.5819L32.8914 37.0939L32.9555 36.23L33.1236 35.798L33.4039 35.806L33.6681 35.63L33.9084 35.27L34.2286 35.166L34.629 35.326L35.1815 34.79L35.8941 33.558L36.4386 32.87L36.8229 32.726L36.895 32.838L36.6548 33.206L36.5827 33.614L36.6788 34.054L36.5987 34.478L36.4226 35.062L36.5347 35.246L36.2304 36.182L36.2144 36.6459L36.3986 36.9979L36.6227 36.8779L36.879 36.278L36.9591 35.958L36.855 35.918L36.895 35.662L37.0711 35.19L37.2313 34.966L37.3674 34.99L37.4075 35.246L37.3434 35.734L36.935 36.8939L36.855 37.2459L36.943 37.3419L37.4315 36.6219L37.8398 35.47L38.1521 34.582L38.2082 34.102L38.1121 32.854L38.1281 32.342L38.2482 31.99L38.6726 31.59L39.4012 31.142L40.1219 30.9021L40.8345 30.87L41.3309 30.7501L41.6112 30.5341L41.5151 30.3661L41.0347 30.2381L40.6743 29.9581L40.4261 29.5261L40.3461 29.0301L40.4261 28.4701L40.7304 27.9181L41.2589 27.3821L41.427 26.9821L41.2349 26.7261L41.4591 26.6381L42.1077 26.7101L42.556 26.6381L42.8123 26.4221H42.7802ZM36.8309 28.4621L36.5747 28.5181L36.3745 28.3901L36.4066 27.8861L36.6708 27.0061L36.927 26.6061L37.2713 26.7661L37.1993 26.8701L37.2713 27.8061L37.1432 28.2221L36.8309 28.4621ZM33.6281 33.806L33.54 33.958L33.3318 33.942L33.1637 33.798L33.0036 33.334L33.0596 33.23L33.4679 33.294L33.6121 33.494L33.6281 33.806Z',
    id: 'mi',
    dimensions: {
      width: 61,
      height: 69,
    },
  },
  {
    name: 'Arizona',
    id: 'az',
    path: 'M44.4999 0.206591V3.53456L44.4919 6.83845V10.1264V13.3983V16.6623V19.9102V23.1422V26.3581V29.5661V32.758V35.934V39.1019V42.2538V45.3978V48.5257V51.6456H42.7783L40.112 51.6537L37.4456 51.6617L34.7873 51.6697H32.1209L29.4545 51.6777L25.8833 50.3817L22.3041 49.0777L18.733 47.7737L15.1618 46.4698L11.5826 45.1578L8.01144 43.8458L4.43228 42.5339L0.861084 41.2219L1.22141 40.7179L1.69381 39.3819L1.72587 39.3019L2.7748 39.2059L3.27124 38.8699L3.55948 38.2539L3.62355 37.6219L3.4634 36.9899L3.00699 36.5099L2.27836 36.1979L1.85396 35.326L1.74185 33.878L1.86999 33.094L2.25432 32.982L2.62266 32.63L2.96696 32.038L3.23121 31.39L3.39933 30.6861L3.43139 29.798L3.32729 28.7181L4.00788 27.3901L4.6805 26.5661L5.92961 25.5581L6.21785 25.2541V25.0061V24.9822L5.96162 24.6302L4.8406 23.9262L4.36019 23.4222L4.32017 22.9582L4.30414 22.9502L4.16001 22.5022L2.95895 20.6302L2.55859 19.6062V18.8382V18.7743L2.70271 15.5183L2.27035 14.3903L2.16625 13.7503L2.29434 12.9664L2.26233 12.4704L2.05414 12.0464L2.0061 11.2704L1.9821 10.3104L1.63775 9.69441L1.57373 9.42244L1.76589 8.75844L2.11821 8.41445L2.6947 8.17446L3.35129 8.09444L4.09594 8.16646L4.66447 8.47046L5.04078 8.99042L5.40912 9.25443L5.77747 9.26243L6.25788 8.83842L6.69024 7.91846L6.83441 7.86246L6.8504 3.84652L6.85841 0.182617H9.21251H11.5586H13.9127L16.2668 0.190576H18.6209H20.975H23.3211L25.6751 0.198584H28.0292H30.3833H32.7374H35.0835L37.4376 0.206591H39.7917H42.1458H44.4999Z',
    dimensions: {
      width: 45,
      height: 52,
    },
  },
  {
    name: 'Wisconsin',
    id: 'wi',
    path: 'M19.5961 0.678604L19.3479 0.854602L19.2518 0.774599L19.3078 0.438618L19.436 0.238622L19.6282 0.182617L19.7242 0.262621V0.478608L19.5961 0.678604ZM17.4742 1.7666L17.3621 1.8466L17.0739 1.6626L17.0339 1.5106L17.1139 1.3586L17.25 1.3906L17.4422 1.6146L17.4742 1.7666ZM19.7323 5.43052L19.6922 5.51853L19.8443 5.91852L20.2287 5.81452L20.3968 6.05451L20.629 6.15851L21.0614 6.3505L21.2696 6.8065L21.4778 7.26249L21.686 7.71849L21.8942 8.17446L22.839 8.43847L23.7839 8.70246L24.7287 8.96647L25.6735 9.23045L26.6184 9.49446L27.5632 9.75844L28.508 10.0225L29.4529 10.2864L29.9814 10.5904L30.5098 10.8944L31.0383 11.1984L31.5668 11.5024L32.3995 11.5584L33.1362 11.7424L34.1691 11.7504L35.21 11.9824L36.7394 12.4864L37.0997 12.9184L37.1637 13.2064L37.0116 13.8784L38.4689 14.4784L39.0935 14.9263L39.3257 15.2704L39.2856 15.5823L39.4298 16.2383L39.2776 16.5903V17.2063L38.9493 17.8543L38.8372 18.2063L38.8292 18.5023L38.9013 18.6943L39.0774 18.7663L39.6299 18.7263L40.1744 18.5263L40.4146 18.6463L40.4627 18.7503L40.4226 18.9263L39.9822 20.0223L39.9983 20.4623L40.1824 20.8943L40.4867 21.3102L40.847 21.4542L40.831 21.7262L40.6869 22.2622L40.2625 22.6862L39.1575 23.2222L38.9814 23.5822L38.9574 23.8782L38.2447 25.1102L37.8924 25.8622L37.6602 26.6462L37.7322 27.1421L38.1086 27.3421L38.4128 27.2621L38.6451 26.9021L38.9974 26.5821L39.4778 26.2942L39.8301 25.8702L40.3185 24.8302L40.863 24.2302L41.1513 24.1982L41.2314 24.2142L41.7999 23.9422L42.2563 24.0302L42.5285 24.4382L42.8088 24.7182L42.8728 24.9822L42.7287 25.5662L42.4724 26.1821L42.0961 26.8301L41.7518 27.7981L41.4476 29.0941L41.3835 30.0701L41.5597 30.7261L41.3915 31.3101L40.879 31.8221L40.4627 32.51L40.1504 33.374L39.9742 34.094L39.9342 34.678L39.9822 35.118L40.1744 35.71L40.1584 36.006L39.5979 37.3019L39.3977 37.934L39.3657 38.4299L39.2296 38.9179L38.8052 39.9099L38.6691 40.4619L38.6451 40.9659L38.7411 41.7898L38.6851 42.0699L38.7091 42.2779L38.8132 42.4219V42.6779L38.7011 43.0538L38.7411 43.3498L38.9333 43.5578L39.0614 43.9578L39.1175 44.5498L39.2616 45.0378L39.5018 45.4298L39.5419 45.9978L39.3897 46.7418L39.3097 48.1417V48.6057L38.3488 48.5977L34.9538 48.5738L31.5587 48.5497L28.1637 48.5258L24.7687 48.5017L21.3737 48.4778L17.9066 48.4537L17.8586 48.3738L17.6264 47.4618L16.8657 46.7818L15.5766 46.3418L14.7518 45.6458L14.3915 44.6938L14.1593 43.6218L14.0632 42.4299L14.1673 41.4299L14.4716 40.6219L14.3915 40.0779L13.9271 39.7899L13.6228 39.4139L13.4787 38.9499L13.4226 38.3099L13.1744 35.254L12.8621 33.806L12.3897 33.238L11.3968 32.574L9.87548 31.8221L8.93862 31.1181L8.40215 30.1261L7.32923 28.9581L6.62459 28.4781L5.93594 28.3021L5.39147 27.9261L4.98309 27.3501L4.42264 26.9901L3.70198 26.8381L2.90126 26.3661L1.94841 25.5182L1.92442 25.4542L1.72424 24.8382L1.8363 24.4942L1.99645 23.3102L1.98042 22.9342L1.77228 21.8542L2.02846 21.4382L1.97246 20.1023L2.06052 19.6623L2.57299 18.5663L2.59699 18.0063L2.41284 17.3583L2.03648 16.8303L1.01961 16.2783L0.987549 15.5903L1.15572 15.0783L1.82032 14.1184L2.18862 13.2624L2.52495 12.8944L4.55874 11.6144L4.99111 11.5264L5.3034 11.1584L5.55162 10.9984V9.43845V7.87049V6.3025V4.72653L6.06409 4.61454L6.28826 4.22256L6.80874 3.60655L6.94485 3.61456V3.62257L7.20108 3.90254L7.84164 4.31054L8.3461 4.35854L8.98666 4.27056L11.5249 3.56656L12.5979 3.07856L13.6468 2.25458L13.7509 2.23058L14.1913 2.38258L14.3274 2.45457L15.6966 1.5106L16.145 1.3906L16.4973 1.4146L16.9378 1.78259L17.0418 2.00658L16.8977 2.43858L16.5054 3.07856L16.3132 3.61456L16.3212 4.05454L16.153 4.52653L15.7207 5.16654L15.8728 5.34253L17.0258 4.87853L17.194 4.70253L17.21 4.59853L17.1379 4.47055L17.2741 4.41455L18.1789 5.04654L18.7874 5.39851L19.2919 5.56653L19.7323 5.43052ZM18.6913 1.85458L18.4431 1.9186L17.8986 1.8226L17.9066 1.6626L18.4671 1.4386L18.7153 1.37459L18.7714 1.47061L18.6913 1.85458ZM17.4502 3.34257L17.0178 3.49457L16.8416 3.46256L16.9137 3.25456L17.1379 3.00656L18.1388 2.39058L18.315 2.39857L18.371 2.54258L17.8826 2.84658L17.6984 3.00656L17.6744 3.17456L17.4502 3.34257ZM46.46 18.8303L46.2358 18.9343L45.8194 18.8943L45.6673 18.6543L45.8835 18.0383L45.9716 18.1503L46.3319 18.1583L46.46 18.2223L46.5001 18.3743L46.46 18.8303ZM45.4831 20.0143L45.347 20.1502L45.1148 20.0623L45.0267 20.2623L45.0748 20.7502L44.9947 20.9742L44.7865 20.9342L44.7785 21.0223L44.9627 21.2382L44.9787 21.4782L44.8346 21.7342L44.6985 21.8542L44.5623 21.8382L44.3541 22.1342L44.0739 22.7422L43.9778 23.0942L44.0659 23.1902L44.0018 23.3902L43.3052 24.3102L43.041 24.3982L42.7447 24.2702L42.5365 23.9982L42.4164 23.5902L42.3844 23.2702L42.4324 23.0462L43.041 22.2302L43.3132 21.6942L43.4653 21.0942L43.7456 20.7102L44.162 20.5423L44.4983 20.1663L44.7545 19.5823L45.0508 19.3263L45.3871 19.3983L45.5312 19.6223L45.4831 20.0143Z',
    dimensions: {
      width: 47,
      height: 49,
    },
  },
  {
    name: 'Nevada',
    id: 'nv',
    path: 'M45.5 48.7977L45.492 52.4616L45.476 56.4776L45.3318 56.5336L44.8994 57.4535L44.419 57.8776L44.0507 57.8696L43.6823 57.6055L43.306 57.0856L42.7375 56.7816L41.9929 56.7096L41.3363 56.7896L40.7598 57.0296L40.4075 57.3736L40.2153 58.0376L40.2793 58.3095L40.6237 58.9255L40.6477 59.8855L40.6957 60.6615L40.9039 61.0855L40.9359 61.5815L40.8078 62.3655L40.9119 63.0054L41.3443 64.1335L41.2002 67.3894V67.4534L39.1503 65.5094L37.2366 63.6935L35.3229 61.8695L33.4092 60.0375L31.4955 58.2055L29.5818 56.3656L27.6681 54.5176L25.7544 52.6696L24.3772 51.3817L22.992 50.0937L21.6067 48.8057L20.2295 47.5097L18.8443 46.2138L17.467 44.9098L16.0818 43.6058L14.6966 42.3019L12.935 40.7499L11.1654 39.1979L9.40385 37.6379L7.64232 36.078L5.87273 34.51L4.11116 32.942L2.34156 31.374L0.580036 29.7981V27.9821L0.572021 26.1661V24.3422V22.5182V20.6862V18.8463V17.0063V15.1583V13.3024V11.4464V9.58245V7.71847V5.84653V3.96653V2.07858V0.190625H3.38253H6.19304H9.0035H11.814H14.6325H17.443H20.2535H23.064H25.8665H28.669L31.4715 0.182617H34.274H37.0765H39.879H42.6814H45.4839V1.75856V3.32655V4.89454V6.45448V8.01446V9.57444V11.1264V12.6704V14.2143V15.7583V17.2943V18.8303L45.492 20.3582V21.8862V23.4142V24.9262V26.4462V27.9581V29.4701V30.974V32.478V33.974V35.47V36.9659V38.4539V39.9419L45.5 41.4219V42.9019V44.3818V45.8538V47.3258V48.7977Z',
    dimensions: {
      width: 46,
      height: 68,
    },
  },
];

const COLORS = {
  'Kamala Harris': '#2653FA',
  'Donald Trump': '#EC1115',
  Undecided: '#787777',
  split: '#A900C0',
};

const LETTERS = {
  'Kamala Harris': 'D',
  'Donald Trump': 'R',
};

function SmallerLetter({
  className,
  backgroundColor,
  letter,
}: {
  className: string;
  letter: string;
  backgroundColor: string;
}) {
  return (
    <div
      className={`flex h-4 w-4 items-center justify-center text-xs font-medium ${className}`}
      style={{ backgroundColor }}
    >
      {letter}
    </div>
  );
}