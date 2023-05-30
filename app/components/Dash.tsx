export default function Dash({
  email,
  picture,
  onSubmit,
}: {
  onSubmit?: () => void;
  email?: string;
  picture?: string;
}) {
  return (
    <article className="flex flex-col justify-center items-center min-h-screen bg-indigo-200">
      <h2 className="text-6xl font-bold">Tu perfil</h2>
      <img
        src={
          picture ||
          "https://pbs.twimg.com/profile_images/1562960963359293446/rGjvMLR1_400x400.jpg"
        }
        alt="avatar"
      />
      <p className="text-4xl">{email}</p>
      <form action={onSubmit}>
        <button
          name="intent"
          value="logout"
          className="py-2 px-4 rounded-md bg-indigo-500 text-white my-4 hover:bg-indigo-600"
        >
          Cerrar sesión
        </button>
      </form>
    </article>
  );
}
