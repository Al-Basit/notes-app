import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { loginFormSchema } from "@/lib/schemas";
export default function LoginPage() {
  const { useHandleLoginInService } = AuthService();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const { mutate: handleLogin, isPending } = useHandleLoginInService();
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    handleLogin(values);
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute transform -translate-y-1/2 top-1/2 right-3"
                            onClick={() => setIsVisible(!isVisible)}
                          >
                            {isVisible ? <Eye /> : <EyeOff />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button isLoading={isPending} type="submit" className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="text-sm text-right">
              <Link to="/forgot-password" className="underline text-primary">
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </Form>

      <div className="hidden h-[100vh] bg-muted lg:flex justify-center items-center">
        <img
          src="/notes.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-1/2 w-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
