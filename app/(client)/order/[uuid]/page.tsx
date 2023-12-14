export default async function Page({ params }: { params: { uuid: string } }) {
  return <div>{params.uuid}</div>;
}
