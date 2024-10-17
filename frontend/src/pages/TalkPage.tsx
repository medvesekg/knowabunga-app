import ItemDuration from "@/components/ItemDuration";
import ItemLocation from "@/components/ItemLocation";
import ItemTags from "@/components/ItemTags";
import ItemTitle from "@/components/ItemTitle";
import { useTitle } from "@/utils/hooks";
import { useParams } from "react-router-dom";
import { getScheduleItem } from "../../../data/api";
import ItemButtons from "@/components/ItemButtons";
import ItemAvatar from "@/components/ItemAvatar";

export default function TalkPage() {
  const { talkId } = useParams() as {
    talkId: string;
  };
  const talk = getScheduleItem(talkId);

  useTitle(talk?.title || "404 Not found");

  if (!talk) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 mt-5">
        <ItemAvatar
          item={talk}
          className="mx-auto"
          style={{
            maxWidth: "min(80%, 24rem)",
            aspectRatio: "1/1",
          }}
        />
      </div>

      <div className="mb-3">
        {(talk.type === "talk" ? talk.speakers : [])
          .map((speaker) => speaker.name)
          .join(" & ")}
      </div>
      <div className="mb-3">
        <ItemTitle title={talk.title} />
      </div>
      <div className="mb-2">
        <ItemDuration from={talk.from} to={talk.to} />{" "}
        {talk.location && <ItemLocation location={talk.location} />}
      </div>
      <div className="mb-10">
        <ItemTags tags={talk.type === "talk" ? talk.tags : []} />
      </div>
      <div className="mb-10">{talk.type === "talk" && talk.description}</div>
      {talk?.type === "talk" && (
        <div className="flex justify-end">
          <ItemButtons item={talk} />
        </div>
      )}
    </div>
  );
}
