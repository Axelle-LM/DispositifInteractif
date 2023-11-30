import s from "./App.module.scss"
import Canvas from "./component/canvas/Canvas";
import Search from "./component/search/Search";
import Song from "./component/song/Song";
import Picker from "./component/picker/Picker";
import useCustomStore from "./customStore";


const App = () => {

  const songs = useCustomStore((state) => state.songs);
  console.log(songs);

  return (
    <div>

      <div className={s.songs}>
        {songs.map((song, key) => {
          return <Song key={key} data={song} />;
        })}
      </div>

      <Canvas />
      <Search />
      <Picker />

    </div>
  );
};

export default App;
