import { User } from "@/types";
import Image from "next/image";
import Button from "./Button";

interface UserProfileDetailsProps {
  user: User;
}

const UserProfileDetails = ({ user }: UserProfileDetailsProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm mx-auto max-w-full md:max-w-none">
      <div className="w-full">
        <div
          className="h-16 md:h-24 w-full rounded-t-lg"
          style={{
            background: "linear-gradient(90deg, #ECE9FB 0%, #FDEDE7 100%)",
          }}
        ></div>

        <div className="flex flex-col md:flex-row md:ml-4 items-center md:items-start -mt-24 md:-mt-8">
          <div className="border-4 border-neutral-50 rounded-full p-1 w-fit">
            <img
              width={120}
              height={120}
              src="/avatar.png"
              alt={`${user.firstName} ${user.lastName}'s avatar`}
              className="rounded-full"
            />
          </div>

          <div className="text-center mt-4 md:ml-8 md:mt-14 md:text-left">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
              <p className="body">@{user.username}</p>
              <p className="body flex items-center gap-2">
                <img
                  width={12}
                  height={14}
                  alt="location"
                  src="/icon (3).png"
                />
                {user.address.city}, {user.address.country}
              </p>
            </div>

            <h4 className="bg-[#E5F4FF] text-[#0077CC] py-[6px] px-3 rounded-full inline-block mt-2">
              {user.company.department}
            </h4>
          </div>
        </div>

        <div className="flex justify-center md:justify-start space-x-8 mt-4 md:ml-[186px]">
          <div className="text-center">
            <h2>{user.totalPosts}</h2>
            <p className="overline-small">Posts</p>
          </div>
          <div className="text-center">
            <h2>{user.totalLikes}</h2>
            <p className="overline-small">Likes</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-start space-x-4 mt-6 border-t border-gray-200 p-4">
        <Button title="Follow" variant="one" />
        <Button title="Message" variant="two" />
      </div>
    </div>
  );
};

export default UserProfileDetails;
