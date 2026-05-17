// =====================================
// FILE: src/pages/Settings.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react";

import {
  Store,
  Mail,
  Globe,
  Tag,
  Crown,
  Calendar,
  Sparkles,
  ShieldCheck,
  LogOut,
  Lock,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

import {
  useNavigate,
} from "react-router-dom";

function Settings() {

  const navigate =
    useNavigate();

  const [user,setUser] =
    useState(null);

  useEffect(()=>{

    const storedUser =
      JSON.parse(
        sessionStorage.getItem(
          "user"
        )
      );

    setUser(storedUser);

  },[]);

  const handleLogout=()=>{

    sessionStorage.clear();

    navigate("/");

  };

  return (

<div
className="
flex
bg-zinc-100
dark:bg-zinc-950
h-screen
overflow-hidden
transition-colors
">

<Sidebar/>

<div
className="
flex-1
overflow-y-auto
p-8
text-zinc-900
dark:text-white
">

{/* HEADER */}

<div className="mb-8">

<h1 className="text-4xl font-bold">
Settings & Preferences
</h1>

<p
className="
text-zinc-500
dark:text-zinc-400
mt-2
">
Manage your store profile and platform settings
</p>

</div>

<div
className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
">

{/* LEFT */}

<div className="xl:col-span-2 space-y-6">

{/* STORE INFO */}

<div
className="
bg-white
dark:bg-zinc-900
rounded-3xl
p-7
border
border-zinc-200
dark:border-zinc-800
shadow-sm
">

<div className="flex items-center gap-3 mb-6">

<div
className="
w-12
h-12
rounded-2xl
bg-violet-100
dark:bg-violet-500/10
flex
items-center
justify-center
">

<Store
size={22}
className="
text-violet-600
dark:text-violet-400
"
/>

</div>

<div>

<h2 className="text-2xl font-semibold">
Store Information
</h2>

<p
className="
text-sm
text-zinc-500
">
Basic store details
</p>

</div>

</div>

<div className="space-y-4">

{[
{
icon:<Store size={20}/>,
title:"Store Name",
value:
user?.storeName ||
"My Store"
},

{
icon:<Mail size={20}/>,
title:"Business Email",
value:
user?.email
},

{
icon:<Globe size={20}/>,
title:"Store Domain",
value:
user?.domain ||
"mystore.myshopify.com"
},

{
icon:<Tag size={20}/>,
title:"Store Category",
value:
user?.category ||
"General"
}

].map((item,index)=>(

<div
key={index}

className="
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-800
rounded-2xl
p-5
flex
items-center
gap-4
shadow-sm
">

<div
className="
text-violet-600
dark:text-violet-400
">
{item.icon}
</div>

<div>

<p
className="
text-sm
text-zinc-500
">
{item.title}
</p>

<h3
className="
text-lg
font-medium
text-zinc-900
dark:text-white
mt-1
">
{item.value}
</h3>

</div>

</div>

))}

</div>

</div>

{/* ACCOUNT */}

<div
className="
bg-white
dark:bg-zinc-900
rounded-3xl
p-7
border
border-zinc-200
dark:border-zinc-800
shadow-sm
">

<div className="flex items-center gap-3 mb-6">

<div
className="
w-12
h-12
rounded-2xl
bg-red-100
dark:bg-red-500/10
flex
items-center
justify-center
">

<ShieldCheck
size={22}
className="
text-red-500
"
/>

</div>

<div>

<h2 className="text-2xl font-semibold">
Account & Security
</h2>

<p
className="
text-sm
text-zinc-500
">
Manage your account access
</p>

</div>

</div>

<div className="flex flex-wrap gap-4">

<button
className="
flex
items-center
gap-2
px-6
py-4
rounded-2xl
bg-violet-100
dark:bg-violet-500/10
hover:scale-105
transition
">

<Lock
size={18}
className="
text-violet-600
dark:text-violet-400
"
/>

<span>
Change Password
</span>

</button>

<button
onClick={handleLogout}

className="
flex
items-center
gap-2
px-6
py-4
rounded-2xl
bg-red-100
dark:bg-red-500/10
hover:scale-105
transition
">

<LogOut
size={18}
className="text-red-500"
/>

<span className="text-red-500">
Logout
</span>

</button>

</div>

</div>

</div>

{/* RIGHT */}

<div>

<div
className="
bg-gradient-to-br
from-violet-50
to-indigo-100
dark:from-zinc-900
dark:to-indigo-950
rounded-3xl
p-7
border
border-zinc-200
dark:border-zinc-800
shadow-sm
relative
overflow-hidden
">

<div className="mb-6 flex justify-between">

<div
className="
w-14
h-14
rounded-2xl
bg-white/50
dark:bg-zinc-800
flex
items-center
justify-center
">

<Crown
size={26}
className="
text-violet-500
"
/>

</div>

<span
className="
inline-flex
items-center
px-2.5
py-1
h-fit
rounded-full
bg-emerald-100
dark:bg-emerald-500/10
border
border-emerald-200
dark:border-emerald-500/20
text-emerald-600
dark:text-emerald-400
text-xs
font-medium
self-start
">
● Active
</span>

</div>

<h2
className="
text-2xl
font-bold
mb-2
">
Business Pro
</h2>

<p
className="
text-zinc-600
dark:text-zinc-400
mb-6
">
Premium commerce optimization plan
</p>

<div className="space-y-4">

<div
className="
bg-white
dark:bg-zinc-900
rounded-2xl
p-5
border
border-zinc-200
dark:border-zinc-800
">

<div className="flex gap-2 mb-2">

<Calendar
size={18}
className="text-violet-500"
/>

<p className="text-sm text-zinc-500">
Valid Till
</p>

</div>

<h3 className="text-xl font-semibold">
31 Dec 2026
</h3>

</div>

<div
className="
bg-white
dark:bg-zinc-900
rounded-2xl
p-5
border
border-zinc-200
dark:border-zinc-800
">

<div className="flex gap-2 mb-2">

<Sparkles
size={18}
className="text-violet-500"
/>

<p className="text-sm text-zinc-500">
Assistant Usage
</p>

</div>

<h3 className="text-2xl font-bold">
148 / 500
</h3>

</div>

<div
className="
bg-white
dark:bg-zinc-900
rounded-2xl
p-5
border
border-zinc-200
dark:border-zinc-800
">

<p className="text-sm text-zinc-500 mb-2">
Products Optimized
</p>

<h3 className="text-2xl font-bold">
42 Products
</h3>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Settings;