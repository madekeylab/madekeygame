/** 페이지가 쓰는 스타일시트(public/css/*.css)를 순서대로 건다. 같은 파일은 React가 한 번만 넣는다. */
export const CORE_STYLES = ["core-5", "core-8", "core", "core-4", "core-2"];
/** 장바구니 서랍 · 검색창처럼 어디서나 뜨는 위젯용 */
export const WIDGET_STYLES = ["core-3", "core-7", "core-6", "lazy"];

export default function Styles({ names }: { names: string[] }) {
  return (
    <>
      {names.map((n) => (
        <link key={n} rel="stylesheet" href={`/css/${n}.css`} precedence="next" />
      ))}
    </>
  );
}
