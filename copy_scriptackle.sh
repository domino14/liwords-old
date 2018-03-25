for file in "scriptackle.js" "scriptackle.wasm" "scriptackle.data"
do
    cp ../../quackle/emscripten/${file} liwords_ex/priv/static/js/scriptackle/
done
