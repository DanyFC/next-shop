import { montserrat } from "@/config/fonts";

interface Props {
  className?: string;
  subtitle?: string;
  title: string;
}

const Title = ({ className = '', title, subtitle = '' }: Props) => {
  return (
    <div className={`${className} mt-3`}>
      <h1
        className={`${montserrat.className} antialiased text-4xl font-semibold my-7`}
      >{title}</h1>
      {
        subtitle && (
          <h3
            className="text-xl mb-5"
          >{subtitle}</h3>
        )
      }
    </div>
  )
}
export default Title