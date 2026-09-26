import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            fullName,
            phone,
            city,
            age,
            job,

            courseId,
            courseTitle,
            courseGroup,

            requestType,
            notes,

            organizationName,
            industry,
            participantCount,
            preferredLocation,
            trainingArea,
        } = body;

        if (
            !String(fullName || "").trim() ||
            !String(phone || "").trim() ||
            !String(courseTitle || "").trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "اطلاعات ضروری کامل نیست.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            requestType === "organization" &&
            !String(organizationName || "").trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "نام سازمان الزامی است.",
                },
                {
                    status: 400,
                }
            );
        }

        const supabaseUrl =
            process.env.NEXT_PUBLIC_SUPABASE_URL;

        const supabaseSecret =
            process.env.SUPABASE_SECRET_KEY;

        if (!supabaseUrl || !supabaseSecret) {
            return NextResponse.json(
                {
                    success: false,
                    message: "تنظیمات دیتابیس کامل نیست.",
                },
                {
                    status: 500,
                }
            );
        }

        const supabase = createClient(
            supabaseUrl,
            supabaseSecret,
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                },
            }
        );

        const { data, error } = await supabase
            .from("course_requests")
            .insert({
                full_name: String(fullName).trim(),
                phone: String(phone).trim(),

                city:
                    String(city || "").trim() || null,

                age:
                    age && Number(age) > 0
                        ? Number(age)
                        : null,

                job:
                    String(job || "").trim() || null,

                course_id:
                    courseId || null,

                course_title:
                    String(courseTitle).trim(),

                course_group:
                    courseGroup || null,

                request_type:
                    requestType || "technical",

                notes:
                    String(notes || "").trim() || null,

                organization_name:
                    String(organizationName || "").trim() || null,

                industry:
                    String(industry || "").trim() || null,

                participant_count:
                    participantCount &&
                        Number(participantCount) > 0
                        ? Number(participantCount)
                        : null,

                preferred_location:
                    String(preferredLocation || "").trim() || null,

                training_area:
                    String(trainingArea || "").trim() || null,

                status: "new",
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "ذخیره درخواست انجام نشد.",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                request: data,
            },
            {
                status: 201,
            }
        );
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "خطایی در ثبت درخواست رخ داد.",
            },
            {
                status: 500,
            }
        );
    }
}