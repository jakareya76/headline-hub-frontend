import { Chart } from "react-google-charts";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Admin = () => {
  const axiosSecure = useAxiosSecure();
  const { data: chartData = [] } = useQuery({
    queryKey: ["publishers-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers-stats");

      return res.data;
    },
  });

  const totalArticles = chartData.reduce(
    (sum, publisher) => sum + publisher.articlesCount,
    0
  );

  const data = [
    ["Publisher", "Percentage"],
    ...chartData.map((publisher) => [
      publisher.publisher,
      (publisher.articlesCount / totalArticles) * 100,
    ]),
  ];

  return (
    <div className="flex my-20">
      <div className="w-1/2">
        <Chart
          chartType="Bar"
          data={data}
          options={{
            title: "Publishers Chart",
          }}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
      <div className="w-1/2">
        <Chart
          chartType="PieChart"
          data={data}
          options={{
            title: "Publishers Chart",
          }}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
    </div>
  );
};

export default Admin;
